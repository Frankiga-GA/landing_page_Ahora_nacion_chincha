import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export interface Voluntario {
  id: string;
  nombre_completo: string;
  edad: number | null;
  fecha_nacimiento: string | null;
  celular: string | null;
  correo: string | null;
  distrito: string | null;
  distrito_otro: string | null;
  perfil: string | null;
  perfil_otro: string | null;
  carrera_profesion: string | null;
  centro_estudios_empresa: string | null;
  habilidades: string[] | null;
  habilidades_otro: string | null;
  como_ayudar: string[] | null;
  como_ayudar_otro: string | null;
  disponibilidad: string | null;
  redes_sociales: string[] | null;
  grupos_oficiales: boolean | null;
  coordinar_equipo: string | null;
  motivacion: string | null;
  problema_contribucion: string | null;
  consentimiento: boolean | null;
  creado_en: string;
}

let client: SupabaseClient | null = null;

function adminClient(): SupabaseClient | null {
  if (client) return client;
  const env = import.meta.env as Record<string, string>;
  const url = env.SUPABASE_URL ?? process.env.SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  client = createClient(url, key);
  return client;
}

export interface FiltrosVoluntarios {
  q?: string;
  distrito?: string;
  habilidad?: string;
  limit?: number;
}

export async function getVoluntarios(filtros: FiltrosVoluntarios = {}) {
  const sb = adminClient();
  if (!sb) return { voluntarios: [] as Voluntario[], error: 'La base de datos no está configurada.' };

  let query = sb
    .from('voluntarios')
    .select('*')
    .order('creado_en', { ascending: false })
    .limit(filtros.limit ?? 400);

  const q = filtros.q?.trim();
  if (q) {
    query = query.or(`nombre_completo.ilike.%${q}%,correo.ilike.%${q}%,celular.ilike.%${q}%`);
  }
  if (filtros.distrito) {
    query = query.eq('distrito', filtros.distrito);
  }
  if (filtros.habilidad) {
    query = query.contains('habilidades', [filtros.habilidad]);
  }

  const { data, error } = await query;
  return { voluntarios: (data as Voluntario[]) ?? [], error: error?.message ?? null };
}

export interface StatsVoluntarios {
  total: number;
  hoy: number;
  esteMes: number;
  distritos: number;
}

export async function getStats(): Promise<StatsVoluntarios> {
  const vacio: StatsVoluntarios = { total: 0, hoy: 0, esteMes: 0, distritos: 0 };
  const sb = adminClient();
  if (!sb) return vacio;

  const { data, error } = await sb
    .from('voluntarios')
    .select('creado_en, distrito')
    .limit(2000);

  if (error || !data) return vacio;

  const ahora = new Date();
  const hoyKey = ahora.toDateString();
  const hoy = data.filter((r) => r.creado_en && new Date(r.creado_en).toDateString() === hoyKey).length;
  const esteMes = data.filter((r) => {
    const d = new Date(r.creado_en);
    return d.getMonth() === ahora.getMonth() && d.getFullYear() === ahora.getFullYear();
  }).length;
  const distritos = new Set(data.map((r) => r.distrito).filter(Boolean)).size;

  return { total: data.length, hoy, esteMes, distritos };
}