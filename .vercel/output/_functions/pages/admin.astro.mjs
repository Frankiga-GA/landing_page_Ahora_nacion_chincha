import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, l as defineScriptVars, h as addAttribute, m as maybeRenderHead } from '../chunks/astro/server_CBEUGtRa.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_BeU-ffnx.mjs';
import { s as sesionValida } from '../chunks/auth_BreoIK1h.mjs';
import { createClient } from '@supabase/supabase-js';
import { H as HABILIDADES, D as DISTRITOS } from '../chunks/opciones_Owe3bcrJ.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

let client = null;
function adminClient() {
  if (client) return client;
  const url = "https://hagdxqkfqvpmmtbsyygl.supabase.co";
  const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhZ2R4cWtmcXZwbW10YnN5eWdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5MzM1MTgsImV4cCI6MjEwMTUwOTUxOH0.Q-MWooiSgueIQN7YdtcasllPdUKicYH3noWnf1Mi5k8";
  client = createClient(url, key);
  return client;
}
async function getVoluntarios(filtros = {}) {
  const sb = adminClient();
  if (!sb) return { voluntarios: [], error: "La base de datos no está configurada." };
  let query = sb.from("voluntarios").select("*").order("creado_en", { ascending: false }).limit(filtros.limit ?? 400);
  const q = filtros.q?.trim();
  if (q) {
    query = query.or(`nombre_completo.ilike.%${q}%,correo.ilike.%${q}%,celular.ilike.%${q}%`);
  }
  if (filtros.distrito) {
    query = query.eq("distrito", filtros.distrito);
  }
  if (filtros.habilidad) {
    query = query.contains("habilidades", [filtros.habilidad]);
  }
  const { data, error } = await query;
  return { voluntarios: data ?? [], error: error?.message ?? null };
}
async function getStats() {
  const vacio = { total: 0, hoy: 0, esteMes: 0, distritos: 0 };
  const sb = adminClient();
  if (!sb) return vacio;
  const { data, error } = await sb.from("voluntarios").select("creado_en, distrito").limit(2e3);
  if (error || !data) return vacio;
  const ahora = /* @__PURE__ */ new Date();
  const hoyKey = ahora.toDateString();
  const hoy = data.filter((r) => r.creado_en && new Date(r.creado_en).toDateString() === hoyKey).length;
  const esteMes = data.filter((r) => {
    const d = new Date(r.creado_en);
    return d.getMonth() === ahora.getMonth() && d.getFullYear() === ahora.getFullYear();
  }).length;
  const distritos = new Set(data.map((r) => r.distrito).filter(Boolean)).size;
  return { total: data.length, hoy, esteMes, distritos };
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://zinthiagaray.pe");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  if (!sesionValida(Astro2.cookies)) {
    return Astro2.redirect("/admin/login");
  }
  const url = new URL(Astro2.request.url);
  const q = url.searchParams.get("q") ?? "";
  const distrito = url.searchParams.get("distrito") ?? "";
  const habilidad = url.searchParams.get("habilidad") ?? "";
  const [{ voluntarios, error }, stats] = await Promise.all([
    getVoluntarios({ q, distrito, habilidad }),
    getStats()
  ]);
  const fmtFecha = new Intl.DateTimeFormat("es-PE", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  const fmtFechaRegistro = new Intl.DateTimeFormat("es-PE", { day: "2-digit", month: "short", year: "numeric" });
  function fmtFechaCorta(iso) {
    return iso ? fmtFechaRegistro.format(new Date(iso)) : "\u2014";
  }
  function aTexto(v) {
    return v && v.trim() ? v : "\u2014";
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Panel \u2014 Voluntarios de La Manada", "noindex": true, "data-astro-cid-u2h3djql": true }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template([" ", '<main class="admin" data-astro-cid-u2h3djql> <header class="admin-head" data-astro-cid-u2h3djql> <div data-astro-cid-u2h3djql> <h1 class="admin-title" data-astro-cid-u2h3djql>Voluntarios de La Manada</h1> <p class="admin-sub" data-astro-cid-u2h3djql>Registros del formulario "\xDAnete a La Manada".</p> </div> <div class="admin-actions" data-astro-cid-u2h3djql> <a class="admin-btn admin-btn-ghost" href="/" data-astro-cid-u2h3djql>Ver el sitio</a> <form method="post" action="/admin/logout" data-astro-cid-u2h3djql> <button type="submit" class="admin-btn admin-btn-danger" data-astro-cid-u2h3djql>Salir</button> </form> </div> </header> <section class="stats" data-astro-cid-u2h3djql> <div class="stat" data-astro-cid-u2h3djql> <span class="stat-number" data-astro-cid-u2h3djql>', '</span> <span class="stat-label" data-astro-cid-u2h3djql>Total</span> </div> <div class="stat" data-astro-cid-u2h3djql> <span class="stat-number" data-astro-cid-u2h3djql>', '</span> <span class="stat-label" data-astro-cid-u2h3djql>Hoy</span> </div> <div class="stat" data-astro-cid-u2h3djql> <span class="stat-number" data-astro-cid-u2h3djql>', '</span> <span class="stat-label" data-astro-cid-u2h3djql>Este mes</span> </div> <div class="stat" data-astro-cid-u2h3djql> <span class="stat-number" data-astro-cid-u2h3djql>', '</span> <span class="stat-label" data-astro-cid-u2h3djql>Distritos</span> </div> </section> ', ' <form method="get" class="filters" data-astro-cid-u2h3djql> <input type="search" name="q"', ' placeholder="Buscar por nombre, correo o celular..." class="filter-search" data-astro-cid-u2h3djql> <select name="distrito" class="filter-select" data-astro-cid-u2h3djql> <option value="" data-astro-cid-u2h3djql>Todos los distritos</option> ', ' </select> <select name="habilidad" class="filter-select" data-astro-cid-u2h3djql> <option value="" data-astro-cid-u2h3djql>Todas las habilidades</option> ', ' </select> <button type="submit" class="admin-btn admin-btn-primary" data-astro-cid-u2h3djql>Filtrar</button> ', ' <span class="filter-count" data-astro-cid-u2h3djql>', " resultado(s)</span> </form> ", " ", " </main> <script>(function(){", `
    document.getElementById('export-csv')?.addEventListener('click', () => {
      const columnas = [
        'Registro', 'Nombre completo', 'Edad', 'Fecha de nacimiento', 'Celular', 'Correo',
        'Distrito', 'Distrito (otro)', 'Perfil', 'Perfil (otro)', 'Carrera/Profesi\xF3n',
        'Centro estudios/empresa', 'Habilidades', 'Habilidad (otro)', 'C\xF3mo ayudar',
        'C\xF3mo ayudar (otro)', 'Disponibilidad', 'Redes sociales', 'Grupos oficiales',
        'Coordinar equipo', 'Motivaci\xF3n', 'Problema y contribuci\xF3n', 'Consentimiento',
      ];
      const filas = VOLUNTARIOS.map((v) => [
        v.creado_en, v.nombre_completo, v.edad ?? '', v.fecha_nacimiento ?? '', v.celular ?? '',
        v.correo ?? '', v.distrito ?? '', v.distrito_otro ?? '', v.perfil ?? '', v.perfil_otro ?? '',
        v.carrera_profesion ?? '', v.centro_estudios_empresa ?? '', (v.habilidades ?? []).join('|'),
        v.habilidades_otro ?? '', (v.como_ayudar ?? []).join('|'), v.como_ayudar_otro ?? '',
        v.disponibilidad ?? '', (v.redes_sociales ?? []).join('|'),
        v.grupos_oficiales ? 'S\xED' : 'No', v.coordinar_equipo ?? '',
        v.motivacion ?? '', v.problema_contribucion ?? '', v.consentimiento ? 'S\xED' : 'No',
      ]);

      const escapar = (valor) => \`"\${String(valor ?? '').replace(/"/g, '""')}"\`;
      const csv = [columnas, ...filas].map((f) => f.map(escapar).join(',')).join('\\r\\n');
      const blob = new Blob(["\\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = \`voluntarios_\${new Date().toISOString().slice(0, 10)}.csv\`;
      a.click();
      URL.revokeObjectURL(url);
    });
  })();<\/script>  `], [" ", '<main class="admin" data-astro-cid-u2h3djql> <header class="admin-head" data-astro-cid-u2h3djql> <div data-astro-cid-u2h3djql> <h1 class="admin-title" data-astro-cid-u2h3djql>Voluntarios de La Manada</h1> <p class="admin-sub" data-astro-cid-u2h3djql>Registros del formulario "\xDAnete a La Manada".</p> </div> <div class="admin-actions" data-astro-cid-u2h3djql> <a class="admin-btn admin-btn-ghost" href="/" data-astro-cid-u2h3djql>Ver el sitio</a> <form method="post" action="/admin/logout" data-astro-cid-u2h3djql> <button type="submit" class="admin-btn admin-btn-danger" data-astro-cid-u2h3djql>Salir</button> </form> </div> </header> <section class="stats" data-astro-cid-u2h3djql> <div class="stat" data-astro-cid-u2h3djql> <span class="stat-number" data-astro-cid-u2h3djql>', '</span> <span class="stat-label" data-astro-cid-u2h3djql>Total</span> </div> <div class="stat" data-astro-cid-u2h3djql> <span class="stat-number" data-astro-cid-u2h3djql>', '</span> <span class="stat-label" data-astro-cid-u2h3djql>Hoy</span> </div> <div class="stat" data-astro-cid-u2h3djql> <span class="stat-number" data-astro-cid-u2h3djql>', '</span> <span class="stat-label" data-astro-cid-u2h3djql>Este mes</span> </div> <div class="stat" data-astro-cid-u2h3djql> <span class="stat-number" data-astro-cid-u2h3djql>', '</span> <span class="stat-label" data-astro-cid-u2h3djql>Distritos</span> </div> </section> ', ' <form method="get" class="filters" data-astro-cid-u2h3djql> <input type="search" name="q"', ' placeholder="Buscar por nombre, correo o celular..." class="filter-search" data-astro-cid-u2h3djql> <select name="distrito" class="filter-select" data-astro-cid-u2h3djql> <option value="" data-astro-cid-u2h3djql>Todos los distritos</option> ', ' </select> <select name="habilidad" class="filter-select" data-astro-cid-u2h3djql> <option value="" data-astro-cid-u2h3djql>Todas las habilidades</option> ', ' </select> <button type="submit" class="admin-btn admin-btn-primary" data-astro-cid-u2h3djql>Filtrar</button> ', ' <span class="filter-count" data-astro-cid-u2h3djql>', " resultado(s)</span> </form> ", " ", " </main> <script>(function(){", `
    document.getElementById('export-csv')?.addEventListener('click', () => {
      const columnas = [
        'Registro', 'Nombre completo', 'Edad', 'Fecha de nacimiento', 'Celular', 'Correo',
        'Distrito', 'Distrito (otro)', 'Perfil', 'Perfil (otro)', 'Carrera/Profesi\xF3n',
        'Centro estudios/empresa', 'Habilidades', 'Habilidad (otro)', 'C\xF3mo ayudar',
        'C\xF3mo ayudar (otro)', 'Disponibilidad', 'Redes sociales', 'Grupos oficiales',
        'Coordinar equipo', 'Motivaci\xF3n', 'Problema y contribuci\xF3n', 'Consentimiento',
      ];
      const filas = VOLUNTARIOS.map((v) => [
        v.creado_en, v.nombre_completo, v.edad ?? '', v.fecha_nacimiento ?? '', v.celular ?? '',
        v.correo ?? '', v.distrito ?? '', v.distrito_otro ?? '', v.perfil ?? '', v.perfil_otro ?? '',
        v.carrera_profesion ?? '', v.centro_estudios_empresa ?? '', (v.habilidades ?? []).join('|'),
        v.habilidades_otro ?? '', (v.como_ayudar ?? []).join('|'), v.como_ayudar_otro ?? '',
        v.disponibilidad ?? '', (v.redes_sociales ?? []).join('|'),
        v.grupos_oficiales ? 'S\xED' : 'No', v.coordinar_equipo ?? '',
        v.motivacion ?? '', v.problema_contribucion ?? '', v.consentimiento ? 'S\xED' : 'No',
      ]);

      const escapar = (valor) => \\\`"\\\${String(valor ?? '').replace(/"/g, '""')}"\\\`;
      const csv = [columnas, ...filas].map((f) => f.map(escapar).join(',')).join('\\\\r\\\\n');
      const blob = new Blob(["\\\\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = \\\`voluntarios_\\\${new Date().toISOString().slice(0, 10)}.csv\\\`;
      a.click();
      URL.revokeObjectURL(url);
    });
  })();<\/script>  `])), maybeRenderHead(), stats.total, stats.hoy, stats.esteMes, stats.distritos, error && renderTemplate`<p class="admin-warning" role="alert" data-astro-cid-u2h3djql>${error}</p>`, addAttribute(q, "value"), DISTRITOS.map((d) => renderTemplate`<option${addAttribute(d, "value")}${addAttribute(distrito === d, "selected")} data-astro-cid-u2h3djql>${d}</option>`), HABILIDADES.map((h) => renderTemplate`<option${addAttribute(h, "value")}${addAttribute(habilidad === h, "selected")} data-astro-cid-u2h3djql>${h}</option>`), (q || distrito || habilidad) && renderTemplate`<a href="/admin" class="admin-btn admin-btn-ghost" data-astro-cid-u2h3djql>Limpiar</a>`, voluntarios.length, voluntarios.length === 0 ? renderTemplate`<p class="empty-state" data-astro-cid-u2h3djql>No hay voluntarios registrados con estos filtros.</p>` : renderTemplate`<div class="table-wrap" data-astro-cid-u2h3djql> <table class="voluntarios" data-astro-cid-u2h3djql> <thead data-astro-cid-u2h3djql> <tr data-astro-cid-u2h3djql> <th data-astro-cid-u2h3djql>Registro</th> <th data-astro-cid-u2h3djql>Nombre</th> <th data-astro-cid-u2h3djql>Edad</th> <th data-astro-cid-u2h3djql>Distrito</th> <th data-astro-cid-u2h3djql>Perfil</th> <th data-astro-cid-u2h3djql>Celular</th> <th data-astro-cid-u2h3djql>Correo</th> <th data-astro-cid-u2h3djql>Habilidades</th> <th data-astro-cid-u2h3djql>Detalle</th> </tr> </thead> <tbody data-astro-cid-u2h3djql> ${voluntarios.map((v) => renderTemplate`<tr data-astro-cid-u2h3djql> <td class="cell-date" data-astro-cid-u2h3djql>${fmtFechaCorta(v.creado_en)}</td> <td data-astro-cid-u2h3djql><strong data-astro-cid-u2h3djql>${v.nombre_completo}</strong></td> <td data-astro-cid-u2h3djql>${v.edad ?? "\u2014"}</td> <td data-astro-cid-u2h3djql> <span class="pill" data-astro-cid-u2h3djql> ${v.distrito === "Otro" ? aTexto(v.distrito_otro) : aTexto(v.distrito)} </span> </td> <td data-astro-cid-u2h3djql>${v.perfil === "Otro" ? aTexto(v.perfil_otro) : aTexto(v.perfil)}</td> <td data-astro-cid-u2h3djql>${aTexto(v.celular)}</td> <td class="cell-mail" data-astro-cid-u2h3djql>${aTexto(v.correo)}</td> <td data-astro-cid-u2h3djql><span class="cell-trunc"${addAttribute(fmtList(v.habilidades, v.habilidades_otro), "title")} data-astro-cid-u2h3djql>${fmtList(v.habilidades, v.habilidades_otro)}</span></td> <td data-astro-cid-u2h3djql> <details class="row-detail" data-astro-cid-u2h3djql> <summary data-astro-cid-u2h3djql>Ver todo</summary> <dl class="detail-grid" data-astro-cid-u2h3djql> <div data-astro-cid-u2h3djql><dt data-astro-cid-u2h3djql>Fecha de nacimiento</dt><dd data-astro-cid-u2h3djql>${fmtFechaCorta(v.fecha_nacimiento)}</dd></div> <div data-astro-cid-u2h3djql><dt data-astro-cid-u2h3djql>Carrera o profesión</dt><dd data-astro-cid-u2h3djql>${aTexto(v.carrera_profesion)}</dd></div> <div data-astro-cid-u2h3djql><dt data-astro-cid-u2h3djql>Centro de estudios / empresa</dt><dd data-astro-cid-u2h3djql>${aTexto(v.centro_estudios_empresa)}</dd></div> <div data-astro-cid-u2h3djql><dt data-astro-cid-u2h3djql>Habilidades</dt><dd data-astro-cid-u2h3djql>${fmtList(v.habilidades, v.habilidades_otro)}</dd></div> <div data-astro-cid-u2h3djql><dt data-astro-cid-u2h3djql>Cómo ayudaría</dt><dd data-astro-cid-u2h3djql>${fmtList(v.como_ayudar, v.como_ayudar_otro)}</dd></div> <div data-astro-cid-u2h3djql><dt data-astro-cid-u2h3djql>Disponibilidad</dt><dd data-astro-cid-u2h3djql>${aTexto(v.disponibilidad)}</dd></div> <div data-astro-cid-u2h3djql><dt data-astro-cid-u2h3djql>Redes sociales</dt><dd data-astro-cid-u2h3djql>${fmtList(v.redes_sociales, null)}</dd></div> <div data-astro-cid-u2h3djql><dt data-astro-cid-u2h3djql>Grupos oficiales</dt><dd data-astro-cid-u2h3djql>${v.grupos_oficiales ? "S\xED" : "No"}</dd></div> <div data-astro-cid-u2h3djql><dt data-astro-cid-u2h3djql>Coordinar equipo</dt><dd data-astro-cid-u2h3djql>${v.coordinar_equipo === "no" ? "No" : v.coordinar_equipo === "si" ? "S\xED" : v.coordinar_equipo === "talvez" ? "Tal vez" : "\u2014"}</dd></div> <div class="detail-full" data-astro-cid-u2h3djql><dt data-astro-cid-u2h3djql>Motivación</dt><dd data-astro-cid-u2h3djql>${aTexto(v.motivacion)}</dd></div> <div class="detail-full" data-astro-cid-u2h3djql><dt data-astro-cid-u2h3djql>Problema y contribución</dt><dd data-astro-cid-u2h3djql>${aTexto(v.problema_contribucion)}</dd></div> <div data-astro-cid-u2h3djql><dt data-astro-cid-u2h3djql>Consentimiento (Ley 29733)</dt><dd data-astro-cid-u2h3djql>${v.consentimiento ? "S\xED" : "No"}</dd></div> <div data-astro-cid-u2h3djql><dt data-astro-cid-u2h3djql>Registrado</dt><dd data-astro-cid-u2h3djql>${fmtFecha(v.creado_en)}</dd></div> </dl> </details> </td> </tr>`)} </tbody> </table> </div>`, voluntarios.length > 0 && renderTemplate`<div class="export-bar" data-astro-cid-u2h3djql> <button type="button" id="export-csv" class="admin-btn admin-btn-primary" data-astro-cid-u2h3djql>Exportar CSV</button> <span class="export-hint" data-astro-cid-u2h3djql>Descarga los registros actuales (con filtros aplicados) en formato CSV para Excel/Sheets.</span> </div>`, defineScriptVars({ VOLUNTARIOS: voluntarios })) })}`;
}, "C:/Users/HP Specter/landing_page_Ahora_nacion_chincha/src/pages/admin/index.astro", void 0);

const $$file = "C:/Users/HP Specter/landing_page_Ahora_nacion_chincha/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
