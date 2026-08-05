import { e as createAstro, f as createComponent, h as addAttribute, o as renderHead, p as renderSlot, r as renderTemplate } from './astro/server_CBEUGtRa.mjs';
import 'piccolore';
import 'clsx';
/* empty css                         */

const $$Astro = createAstro("https://zinthiagaray.pe");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title = "Zinthia Garay \u2014 Alcaldesa Provincial de Chincha",
    description = "No m\xE1s corruptos e incapaces, en la tierra que me vio nacer. Zinthia Garay, la Leona de Chincha, candidata a la Alcald\xEDa Provincial de Chincha por Ahora Naci\xF3n.",
    ogImage = "/images/og-default.png",
    noindex = false
  } = Astro2.props;
  return renderTemplate`<html lang="es" class="scroll-smooth"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title><meta name="description"${addAttribute(description, "content")}><meta name="robots"${addAttribute(noindex ? "noindex, nofollow" : "index, follow", "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(ogImage, "content")}><meta property="og:type" content="website"><meta property="og:locale" content="es_PE"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="canonical" href="https://zinthiagaray.pe"><meta http-equiv="X-Content-Type-Options" content="nosniff"><meta http-equiv="X-Frame-Options" content="DENY"><meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Anton&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-gris-claro text-gris-oscuro antialiased"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/Users/HP Specter/landing_page_Ahora_nacion_chincha/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
