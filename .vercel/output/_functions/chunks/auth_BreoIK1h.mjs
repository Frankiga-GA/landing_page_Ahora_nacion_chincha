import { timingSafeEqual, createHash } from 'node:crypto';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "PUBLIC_TURNSTILE_SITE_KEY": "", "SITE": "https://zinthiagaray.pe", "SSR": true};
const SESSION_COOKIE = "manada_admin";
const SESSION_HORAS = 24 * 7;
const MAX_INTENTOS = 5;
const VENTANA_MS = 15 * 60 * 1e3;
function envValue(key) {
  return Object.assign(__vite_import_meta_env__, { OS: process.env.OS })[key] ?? "";
}
function hash(value) {
  return createHash("sha256").update(value).digest("hex");
}
function iguales(a, b) {
  const ha = hash(a);
  const hb = hash(b);
  return timingSafeEqual(Buffer.from(ha), Buffer.from(hb));
}
function adminToken() {
  return envValue("ADMIN_TOKEN");
}
function emailAdmin() {
  return envValue("ADMIN_EMAIL").trim().toLowerCase();
}
function credencialesValidas(email, password) {
  const emailEsperado = emailAdmin();
  const passwordEsperada = envValue("ADMIN_PASSWORD");
  const emailLimpio = email.trim().toLowerCase();
  return emailEsperado !== "" && passwordEsperada !== "" && emailLimpio !== "" && password !== "" && iguales(emailLimpio, emailEsperado) && iguales(password, passwordEsperada);
}
function sesionValida(cookies) {
  const token = adminToken();
  if (!token) return false;
  const cookie = cookies.get(SESSION_COOKIE)?.value ?? "";
  return cookie !== "" && iguales(cookie, token);
}
function iniciarSesion(cookies) {
  cookies.set(SESSION_COOKIE, adminToken(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * SESSION_HORAS
  });
}
function cerrarSesion(cookies) {
  cookies.delete(SESSION_COOKIE, { path: "/" });
}
const intentosPorIp = /* @__PURE__ */ new Map();
function loginBloqueado(ip) {
  const registro = intentosPorIp.get(ip);
  if (!registro) return false;
  if (Date.now() > registro.hasta) {
    intentosPorIp.delete(ip);
    return false;
  }
  return registro.count >= MAX_INTENTOS;
}
function registrarIntento(ip) {
  const ahora = Date.now();
  const registro = intentosPorIp.get(ip);
  if (!registro || ahora > registro.hasta) {
    intentosPorIp.set(ip, { count: 1, hasta: ahora + VENTANA_MS });
    return;
  }
  registro.count += 1;
}
function restablecerIntentos(ip) {
  intentosPorIp.delete(ip);
}

export { registrarIntento as a, cerrarSesion as b, credencialesValidas as c, iniciarSesion as i, loginBloqueado as l, restablecerIntentos as r, sesionValida as s };
