import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const prerender = false;

const DISTRITOS = [
  'Chincha Alta',
  'Pueblo Nuevo',
  'Grocio Prado',
  'Alto Larán',
  'Sunampe',
  'Chincha Baja',
  'Tambo de Mora',
  'El Carmen',
  'Otro',
];

const PERFILES = [
  'Estudiante',
  'Profesional',
  'Técnico',
  'Emprendedor',
  'Comerciante',
  'Agricultor',
  'Trabajador independiente',
  'Otro',
];

const HABILIDADES = [
  'Diseño gráfico',
  'Edición de video',
  'Fotografía',
  'Producción audiovisual',
  'Redes sociales',
  'TikTok',
  'Facebook',
  'Instagram',
  'Community Manager',
  'Marketing',
  'Publicidad',
  'Organización de eventos',
  'Logística',
  'Tecnología',
  'Programación',
  'Inteligencia Artificial',
  'Comunicación',
  'Relaciones Públicas',
  'Oratoria',
  'Música',
  'Deportes',
  'Educación',
  'Salud',
  'Derecho',
  'Administración',
  'Otro',
];

const COMO_AYUDAR = [
  'Difundiendo contenido',
  'Creando videos',
  'Diseñando publicaciones',
  'Tomando fotografías',
  'Grabando eventos',
  'Organización de actividades',
  'Apoyo en campañas digitales',
  'Convocando jóvenes',
  'Voluntariado en eventos',
  'Capacitando personas',
  'Otro',
];

const DISPONIBILIDAD = [
  '1 a 2 horas',
  '3 a 5 horas',
  'Más de 5 horas',
  'Solo fines de semana',
  'Según necesidad',
];

const REDES = ['Facebook', 'TikTok', 'Instagram', 'WhatsApp', 'Telegram', 'LinkedIn'];

const JSON_HEADERS = { 'Content-Type': 'application/json; charset=utf-8' };

function json(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

function solo(blob: FormData, name: string): string {
  return (blob.get(name) ?? '').toString().trim();
}

function soloDeLista(blob: FormData, name: string, list: string[]): string {
  const v = solo(blob, name);
  return list.includes(v) ? v : '';
}

function multiDeLista(blob: FormData, name: string, list: string[]): string[] {
  return blob.getAll(name).map((v) => v.toString()).filter((v) => list.includes(v));
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
  const fd = await request.formData();

  // Honeypot: los bots rellenan este campo oculto. Devuelve éxito sin guardar.
  if (fd.get('website')?.toString()) {
    return json(200, { ok: true });
  }

  const nombre = solo(fd, 'nombre_completo');
  if (nombre.length < 2) {
    return json(400, { error: 'El nombre completo es obligatorio.' });
  }

  const correo = solo(fd, 'correo').toLowerCase();
  if (!EMAIL_RE.test(correo)) {
    return json(400, { error: 'Ingresa un correo electrónico válido.' });
  }

  const edadRaw = parseInt(solo(fd, 'edad'), 10);
  if (solo(fd, 'edad') && (Number.isNaN(edadRaw) || edadRaw < 1 || edadRaw > 120)) {
    return json(400, { error: 'La edad ingresada no es válida.' });
  }
  const edad = Number.isFinite(edadRaw) ? edadRaw : null;

  if (fd.get('consentimiento')?.toString() !== '1') {
    return json(400, { error: 'Debes aceptar el tratamiento de tus datos personales.' });
  }

  const distrito = soloDeLista(fd, 'distrito', DISTRITOS);
  if (!distrito) {
    return json(400, { error: 'Selecciona el distrito donde vives.' });
  }

  // Verificación Cloudflare Turnstile (anti-spam)
  const token = solo(fd, 'cf-turnstile-response');
  const secret = (import.meta.env as Record<string, string>).TURNSTILE_SECRET_KEY;
  if (!token || !secret) {
    return json(400, { error: 'No pudimos verificar que eres humano, vuelve a intentarlo.' });
  }
  const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token }).toString(),
  });
  const verifyJson = (await verify.json()) as { success?: boolean };
  if (!verifyJson.success) {
    return json(400, { error: 'Verificación anti-spam fallida. Inténtalo de nuevo.' });
  }

  const supabaseUrl = (import.meta.env as Record<string, string>).SUPABASE_URL;
  const supabaseKey = (import.meta.env as Record<string, string>).SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return json(500, { error: 'La base de datos no está configurada.' });
  }

  const row = {
    nombre_completo: nombre,
    edad,
    fecha_nacimiento: solo(fd, 'fecha_nacimiento') || null,
    celular: solo(fd, 'celular'),
    correo,
    distrito,
    perfil: soloDeLista(fd, 'perfil', PERFILES),
    carrera_profesion: solo(fd, 'carrera_profesion'),
    centro_estudios_empresa: solo(fd, 'centro_estudios_empresa'),
    habilidades: multiDeLista(fd, 'habilidades', HABILIDADES),
    como_ayudar: multiDeLista(fd, 'como_ayudar', COMO_AYUDAR),
    disponibilidad: soloDeLista(fd, 'disponibilidad', DISPONIBILIDAD),
    redes_sociales: multiDeLista(fd, 'redes_sociales', REDES),
    grupos_oficiales: solo(fd, 'grupos_oficiales') === 'si',
    coordinar_equipo: soloDeLista(fd, 'coordinar_equipo', ['si', 'no', 'talvez']),
    motivacion: solo(fd, 'motivacion'),
    problema_contribucion: solo(fd, 'problema_contribucion'),
    consentimiento: true,
  };

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { error } = await supabase.from('voluntarios').insert(row);

  if (error) {
    console.error('Supabase insert error:', error.message);
    return json(500, { error: 'No se pudo guardar tu registro. Inténtalo en unos minutos.' });
  }

  return json(200, { ok: true });
};