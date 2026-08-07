import { e as createAstro, f as createComponent } from '../../chunks/astro/server_CBEUGtRa.mjs';
import 'piccolore';
import 'clsx';
import { b as cerrarSesion } from '../../chunks/auth_jdMp3X-S.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://zinthiagaray.pe");
const prerender = false;
const $$Logout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Logout;
  cerrarSesion(Astro2.cookies);
  return Astro2.redirect("/admin/login");
}, "C:/Users/HP Specter/landing_page_Ahora_nacion_chincha/src/pages/admin/logout.astro", void 0);

const $$file = "C:/Users/HP Specter/landing_page_Ahora_nacion_chincha/src/pages/admin/logout.astro";
const $$url = "/admin/logout";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Logout,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
