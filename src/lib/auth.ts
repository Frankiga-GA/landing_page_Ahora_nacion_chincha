import { createHash, timingSafeEqual } from 'node:crypto';
import type { AstroCookies } from 'astro';

const SESSION_COOKIE = 'manada_admin';
const SESSION_HORAS = 24 * 7;
const MAX_INTENTOS = 5;
const VENTANA_MS = 15 * 60 * 1000;

function envValue(key: string): string {
  return ((import.meta.env as Record<string, string>)[key] ?? (process.env as Record<string, string>)[key] ?? '');
}

function hash(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

function iguales(a: string, b: string): boolean {
  const ha = hash(a);
  const hb = hash(b);
  return timingSafeEqual(Buffer.from(ha), Buffer.from(hb));
}

export function adminToken(): string {
  return envValue('ADMIN_TOKEN');
}

export function emailAdmin(): string {
  return envValue('ADMIN_EMAIL').trim().toLowerCase();
}

export function credencialesValidas(email: string, password: string): boolean {
  const emailEsperado = emailAdmin();
  const passwordEsperada = envValue('ADMIN_PASSWORD');
  const emailLimpio = email.trim().toLowerCase();
  return (
    emailEsperado !== '' &&
    passwordEsperada !== '' &&
    emailLimpio !== '' &&
    password !== '' &&
    iguales(emailLimpio, emailEsperado) &&
    iguales(password, passwordEsperada)
  );
}

export function sesionValida(cookies: AstroCookies): boolean {
  const token = adminToken();
  if (!token) return false;
  const cookie = cookies.get(SESSION_COOKIE)?.value ?? '';
  return cookie !== '' && iguales(cookie, token);
}

export function iniciarSesion(cookies: AstroCookies): void {
  cookies.set(SESSION_COOKIE, adminToken(), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * SESSION_HORAS,
  });
}

export function cerrarSesion(cookies: AstroCookies): void {
  cookies.delete(SESSION_COOKIE, { path: '/' });
}

// ---- Control de intentos de login (best-effort en serverless) --------------
const intentosPorIp = new Map<string, { count: number; hasta: number }>();

export function loginBloqueado(ip: string): boolean {
  const registro = intentosPorIp.get(ip);
  if (!registro) return false;
  if (Date.now() > registro.hasta) {
    intentosPorIp.delete(ip);
    return false;
  }
  return registro.count >= MAX_INTENTOS;
}

export function registrarIntento(ip: string): void {
  const ahora = Date.now();
  const registro = intentosPorIp.get(ip);
  if (!registro || ahora > registro.hasta) {
    intentosPorIp.set(ip, { count: 1, hasta: ahora + VENTANA_MS });
    return;
  }
  registro.count += 1;
}

export function restablecerIntentos(ip: string): void {
  intentosPorIp.delete(ip);
}