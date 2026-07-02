# Studio Crystal Lashes — Site Oficial

Site institucional do **Studio Crystal Lashes**, estúdio de extensão de cílios da Stefanie Moura Oliveira em Vila Assunção, Santo André, SP.

**Live:** [crystal-lashes-site.pages.dev](https://crystal-lashes-site.pages.dev)
**Deploy:** Cloudflare Pages via GitHub Actions (push em `master` → deploy automático)

---

## Stack

- **Framework:** Astro 5 (static site, zero JS por padrão)
- **Libs:** Swiper.js (carrossel de depoimentos), PhotoSwipe (lightbox de galeria)
- **Fontes:** Lora (headings) · Montserrat (body) · BetterSignature (marca)
- **Deploy:** Cloudflare Pages · GitHub Actions (`deploy.yml`)

---

## Estrutura

```text
src/
├── components/
│   ├── Header.astro        # Nav sticky, mobile nav com inert, burger
│   ├── Footer.astro        # Logo, links, endereço, redes sociais
│   ├── SEO.astro           # meta, OG, Twitter Card, JSON-LD LocalBusiness
│   ├── ServiceCard.astro   # Card de serviço com preço e duração
│   └── WhatsAppCTA.astro   # Botão flutuante WhatsApp
├── layouts/
│   └── Base.astro          # HTML base, skip link, main#main-content
├── pages/
│   ├── index.astro         # Home
│   ├── sobre.astro         # Sobre a Stefanie
│   ├── servicos.astro      # Serviços, preços e FAQ
│   ├── resultados.astro    # Galeria PhotoSwipe + depoimentos
│   ├── contato.astro       # WhatsApp, endereço, mapa, horários
│   └── blog/
│       ├── index.astro     # Listagem de posts
│       └── [...slug].astro # Post individual
├── content/
│   └── blog/               # Posts em Markdown (.md)
└── styles/
    └── global.css          # Design system completo (tokens, componentes, utilitários)

public/
├── fonts/                  # BetterSignature (TTF/OTF)
└── fotos/                  # Fotos reais do studio (comprimidas para web)
    ├── blog/
    ├── espaco/
    ├── resultados/
    └── stefanie/
```

---

## Design System

Tokens em `src/styles/global.css`:

| Token | Valor | Uso |
| --- | --- | --- |
| `--calcita` | `#7CE0D3` | Cor assinatura da marca |
| `--teal-deep` | `#0F2820` | Textos escuros, seções dark |
| `--calcita-soft` | `#E9FBF8` | Fundos de seções calcita |
| `--radius` / `--radius-md` / `--radius-lg` | `4px` | Raios flat em todos os elementos |
| `--font-brand` | BetterSignature | Logo no header e footer |
| `--font-heading` | Lora | Títulos h1-h4 |
| `--font-body` | Montserrat | Corpo de texto |

**Seções de página:**

- `.section--dark` → fundo `#0F2820` (teal-deep)
- `.section--calcita` → fundo `#E9FBF8` com noise texture
- `.section--calcita-brand` → fundo `#7CE0D3` sólido
- `.page-hero.section--dark` → gradiente calcita → offwhite, texto teal-deep

---

## Comandos

```bash
npm install          # instalar dependências
npm run dev          # servidor local em localhost:4321
npm run build        # build para dist/
npm run preview      # preview do build
```

> Dev server em background (conforme CLAUDE.md): `astro dev --background`

---

## Deploy

Push para `master` → GitHub Actions → `npm run build` → `wrangler pages deploy dist`.

Secrets necessários no repositório (Settings → Secrets → Actions):

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

---

## Páginas

| Rota | Página |
| --- | --- |
| `/` | Home — hero, diferenciais, serviços preview, resultados preview, depoimentos, blog preview |
| `/sobre` | Sobre a Stefanie — história, autoridade, Mapeamento Crystal, ambiente |
| `/servicos` | Serviços e preços — cards, guia de efeitos, infos de agendamento, FAQ |
| `/resultados` | Galeria de trabalhos — PhotoSwipe lightbox, fotos do espaço, depoimentos Swiper |
| `/contato` | Contato — WhatsApp CTA, endereço, mapa, horários, redes sociais |
| `/blog` | Listagem de posts do blog |
| `/blog/[slug]` | Post individual com JSON-LD BlogPosting |

---

## O que já foi feito

### Design System e Base

- Tokens CSS completos: paleta calcita, tipografia, raios flat 4px, sombras, bordas, transições
- Micro-textura SVG noise nas seções muted/calcita/calcita-brand
- Sistema de heroes: gradiente calcita → offwhite com texto teal-deep (todas as páginas internas)
- `eyebrow` com `✦` como marcador autoral, `.btn` com 4 variants
- `font-display: swap` na BetterSignature, preconnect para Google Fonts

### Acessibilidade

- Skip link funcional (`Ir para o conteúdo`)
- `inert` no mobile nav quando fechado
- `:focus-visible` global com outline calcita
- `aria-label`, `aria-expanded`, `aria-controls` no burger
- `touch-action: manipulation` em todos os botões
- `<time datetime>`, `<address>` semânticos
- `aria-hidden` nos SVGs decorativos
- `id="main-content"` no `<main>`

### Performance

- `width`/`height` explícitos em todas as imagens — sem CLS
- `loading="eager"` nas primeiras imagens, `lazy` nas demais
- `fetchpriority` e `preload` na fonte BetterSignature
- `{ passive: true }` no scroll listener do header
- `prefers-reduced-motion` respeitado em animações e Swiper
- Fotos comprimidas para web: `public/fotos/` de 98MB → 12MB

### SEO

- `SEO.astro` com meta description, canonical, OG completo, Twitter Card
- JSON-LD `BeautySalon` com geo, openingHours, priceRange, areaServed, sameAs
- JSON-LD `BlogPosting` nos posts com author, publisher, datePublished
- `theme-color` meta, `og:locale: pt_BR`
- `@astrojs/sitemap` gerando `sitemap-index.xml`

### Componentes e Arquitetura

- `Header.astro`: nav sticky, scroll shadow, mobile nav drawer, `inert` toggle
- `Footer.astro`: grid responsivo, sociais com hover por rede
- `ServiceCard.astro`: `aria-label` no CTA, `font-variant-numeric: tabular-nums` no preço
- `WhatsAppCTA.astro`: botão flutuante com borda calcita e glow
- `SEO.astro`: centraliza todos os metadados

### Páginas implementadas

- **Home**: hero animado, espaço do studio, diferenciais, serviços preview, resultados preview, depoimentos Swiper, blog preview, CTA final
- **Sobre**: hero com foto Stefanie, autoridade (fact-cards), história, Mapeamento Crystal (4 steps), ambiente do studio
- **Serviços**: cards de serviços, guia de efeitos (tabela), informações de agendamento, FAQ com accordion animado
- **Resultados**: galeria editorial PhotoSwipe (9 fotos), fotos do espaço, depoimentos Swiper, CTA
- **Contato**: WhatsApp primário, endereço, mapa iframe, tabela de horários, redes sociais
- **Blog**: listagem dinâmica de posts, cards com data/tags, IntersectionObserver reveal
- **Blog post**: layout editorial completo, `.img-wide`, `.img-float`, table styles, blockquote, JSON-LD

---

## Pendências — Plano de Ação (da AUDITORIA.md)

Ver detalhes completos em `AUDITORIA.md`. Resumo priorizando impacto:

### Alta prioridade

- [ ] `priceRange` no SEO.astro está `'R$75 – R$220'` — corrigir para `'R$150 – R$250'`
- [ ] `blogPreview` hard-coded em index.astro — usar `getCollection('blog').slice(0,3)` dinâmico
- [ ] `style="color: #fff"` morto em 6 h1s (sobre, resultados, servicos, contato, blog/index, blog/slug) — remover
- [ ] Google Fonts via `@import` no CSS — mover para `<link>` no head (impacto no LCP)
- [ ] `transition: all` no WhatsAppCTA.astro — substituir por propriedades explícitas

### Média prioridade

- [ ] IntersectionObserver duplicado em 6 páginas — mover para Base.astro
- [ ] `services` array duplicado em index.astro e servicos.astro — extrair para `src/data/services.ts`
- [ ] `TestimonialCard.astro` — extrair componente (`.home-testimonial` e `.dep-card` são idênticos)
- [ ] Scroll reveal é noop: `.reveal` começa com `opacity: 1` — reativar animação ou remover o sistema
- [ ] Mobile nav não fecha ao clicar em link — adicionar listener nos links
- [ ] `border-radius: 50px` no WA float e `12px` nas post-tags — usar `var(--radius-pill)`
- [ ] Breakpoint `860px` no contato.astro — padronizar para `768px`
- [ ] `fetchpriority="high"` na imagem hero (LCP)
- [ ] Blog cards: `loading="eager"` em todas as imagens — só no primeiro

### Baixa prioridade / Features

- [ ] Breadcrumb JSON-LD nas páginas internas
- [ ] `openingHoursSpecification` declarar sábado como fechado explicitamente
- [ ] `<meta name="robots" content="index, follow">` explícito
- [ ] `minmax(min(320px, 100%), 1fr)` nos cards do blog — fix overflow em telas 360px
- [ ] `max-height: 60svh` na hero photo mobile — fix em iPhones SE
- [ ] Astro View Transitions entre páginas
- [ ] Botão "Abrir no Google Maps" abaixo do iframe no contato
- [ ] Mini-depoimento de destaque no hero (social proof acima da dobra)
- [ ] Mensagens WhatsApp mais específicas por técnica/contexto
