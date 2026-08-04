export { renderers } from '../../renderers.mjs';

const prerender = false;
const DISTRITOS = [
  "Chincha Alta",
  "Pueblo Nuevo",
  "Grocio Prado",
  "Alto Larán",
  "Sunampe",
  "Chincha Baja",
  "Tambo de Mora",
  "El Carmen",
  "Otro"
];
const JSON_HEADERS = { "Content-Type": "application/json; charset=utf-8" };
function json(status, body) {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}
function solo(blob, name) {
  return (blob.get(name) ?? "").toString().trim();
}
function soloDeLista(blob, name, list) {
  const v = solo(blob, name);
  return list.includes(v) ? v : "";
}
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const POST = async ({ request }) => {
  const fd = await request.formData();
  if (fd.get("website")?.toString()) {
    return json(200, { ok: true });
  }
  const nombre = solo(fd, "nombre_completo");
  if (nombre.length < 2) {
    return json(400, { error: "El nombre completo es obligatorio." });
  }
  const correo = solo(fd, "correo").toLowerCase();
  if (!EMAIL_RE.test(correo)) {
    return json(400, { error: "Ingresa un correo electrónico válido." });
  }
  const edadRaw = parseInt(solo(fd, "edad"), 10);
  if (solo(fd, "edad") && (Number.isNaN(edadRaw) || edadRaw < 1 || edadRaw > 120)) {
    return json(400, { error: "La edad ingresada no es válida." });
  }
  if (fd.get("consentimiento")?.toString() !== "1") {
    return json(400, { error: "Debes aceptar el tratamiento de tus datos personales." });
  }
  const distrito = soloDeLista(fd, "distrito", DISTRITOS);
  if (!distrito) {
    return json(400, { error: "Selecciona el distrito donde vives." });
  }
  solo(fd, "cf-turnstile-response");
  {
    return json(400, { error: "No pudimos verificar que eres humano, vuelve a intentarlo." });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
