import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_CBEUGtRa.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_B0bKjV8h.mjs';
import { l as loginBloqueado, c as credencialesValidas, i as iniciarSesion, r as restablecerIntentos, a as registrarIntento } from '../../chunks/auth_jdMp3X-S.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://zinthiagaray.pe");
const prerender = false;
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  let error = "";
  if (Astro2.request.method === "POST") {
    const ip = Astro2.clientAddress ?? "desconocido";
    const fd = await Astro2.request.formData();
    const email = (fd.get("email") ?? "").toString();
    const password = (fd.get("password") ?? "").toString();
    if (loginBloqueado(ip)) {
      error = "Demasiados intentos fallidos. Espera 15 minutos e int\xE9ntalo de nuevo.";
    } else if (credencialesValidas(email, password)) {
      iniciarSesion(Astro2.cookies);
      restablecerIntentos(ip);
      return Astro2.redirect("/admin");
    } else {
      registrarIntento(ip);
      error = "Correo o contrase\xF1a incorrectos.";
    }
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Acceso restringido \u2014 La Manada de Chincha", "noindex": true, "data-astro-cid-rf56lckb": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="login-page" data-astro-cid-rf56lckb> <form method="post" class="login-card" data-astro-cid-rf56lckb> <div class="login-logo" aria-hidden="true" data-astro-cid-rf56lckb> <svg width="34" height="34" viewBox="0 0 40 40" fill="none" data-astro-cid-rf56lckb> <circle cx="20" cy="20" r="18" fill="#D72638" data-astro-cid-rf56lckb></circle> <path d="M12 18C12 14 16 10 20 10C24 10 28 14 28 18V22C28 26 24 30 20 30C16 30 12 26 12 22V18Z" fill="white" data-astro-cid-rf56lckb></path> <rect x="14" y="20" width="12" height="2" rx="1" fill="#D72638" data-astro-cid-rf56lckb></rect> </svg> </div> <h1 class="login-title" data-astro-cid-rf56lckb>Panel de administración</h1> <p class="login-sub" data-astro-cid-rf56lckb>Ingresa tu correo y contraseña para ver los voluntarios de La Manada.</p> ${error && renderTemplate`<p class="login-error" role="alert" data-astro-cid-rf56lckb>${error}</p>`} <label class="login-field" data-astro-cid-rf56lckb> <span class="login-label" data-astro-cid-rf56lckb>Correo electrónico</span> <input type="email" name="email" required autocomplete="username" autofocus inputmode="email" data-astro-cid-rf56lckb> </label> <label class="login-field" data-astro-cid-rf56lckb> <span class="login-label" data-astro-cid-rf56lckb>Contraseña</span> <input type="password" name="password" required autocomplete="current-password" data-astro-cid-rf56lckb> </label> <button type="submit" class="login-btn" data-astro-cid-rf56lckb>Entrar</button> <a href="/" class="login-back" data-astro-cid-rf56lckb>← Volver al sitio</a> </form> </main>  ` })}`;
}, "C:/Users/HP Specter/landing_page_Ahora_nacion_chincha/src/pages/admin/login.astro", void 0);

const $$file = "C:/Users/HP Specter/landing_page_Ahora_nacion_chincha/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
