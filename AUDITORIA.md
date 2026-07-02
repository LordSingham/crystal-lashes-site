# Auditoria Crystal Lashes — Nota Geral: 7,7 / 10

> Gerada em 2026-07-01. Aguardando execução do plano de ação.

---

## Sumário Executivo

| Especialidade | Nota | GAP principal para 10 |
|---|---|---|
| Design Visual / Estética | **7,5** | Border-radius inconsistente, hero photo overflow, blog hero fraco |
| Acessibilidade (A11y) | **7,0** | Hierarquia de headings quebrada, mobile nav não fecha em link |
| Performance / Web Vitals | **7,0** | Google Fonts via @import, sem WebP, fetchpriority ausente |
| SEO / Metadados | **8,0** | priceRange errado, sem breadcrumbs, sem sitemap referenciado |
| Copywriting / Conteúdo | **7,5** | blogPreview hard-coded, você/te mixados, sem urgência |
| Responsividade / Mobile | **8,0** | minmax em cards causa overflow em 360px, height fixa no hero |
| Componentes / Arquitetura | **8,5** | Observer duplicado 6x, services duplicado, TestimonialCard ausente |
| Interatividade / UX | **7,5** | Scroll reveal não faz nada, sem View Transitions, nav não fecha |
| Conversão / Funil | **8,0** | Social proof abaixo da dobra, links Maps, mensagens genéricas |
| Consistência de Sistema | **8,0** | `color: #fff` morto em 6 h1s, radius inconsistentes, transition: all |
| **MÉDIA GERAL** | **7,75** | |

---

## Top 5 — Maior Impacto, Menor Esforço

1. `@import` Google Fonts → `<link>` no head — impacto direto no LCP
2. Scroll reveal reativar ou remover — observer existe mas animação é noop (opacidade não muda)
3. `priceRange: 'R$75 – R$220'` no JSON-LD errado — dados reais são R$150–R$250
4. Código morto `style="color: #fff"` em 6 h1s (sobrescrito pelo !important do global.css)
5. `services` array duplicado / `blogPreview` hard-coded — risco de dessincronização

---

## 1. Design Visual / Estética — 7,5 / 10

### Pontos fortes
- Paleta coerente: calcita (#7CE0D3) como assinatura, teal-deep como âncora
- Tipografia Lora + Montserrat + BetterSignature bem calibrada
- Micro-textura SVG noise nas seções (section--muted, --calcita, --calcita-brand)
- Alternância de backgrounds cria ritmo visual eficiente
- `eyebrow` com `✦` como marcador autoral e memorizável

### Itens para 10

| # | Problema | Arquivo:linha | Ação |
|---|---|---|---|
| 1 | `border-radius: 50px` no WA float e `12px` nas post-tags vs sistema flat | WhatsAppCTA.astro:31, [...slug].astro:143 | Usar `var(--radius-pill)` |
| 2 | `backdrop-filter: blur(4px)` em diff-item sobre fundo sólido — efeito inerte | index.astro:488 | Remover blur ou criar camada de profundidade real |
| 3 | `transform: translateY(22px)` hardcoded na hero photo — sobreposição na próxima seção | index.astro:426 | Alinhar com padding-bottom da seção |
| 4 | Blog hero h1 é apenas "Blog" — único hero sem subtítulo elaborado | blog/index.astro:21 | Título composto como nas outras páginas |
| 5 | Fotos 2048px+ sem WebP/srcset — qualidade percebida cai em conexões lentas | resultados.astro, sobre.astro | `<Image>` Astro ou converter para WebP |

---

## 2. Acessibilidade (A11y) — 7,0 / 10

### Pontos fortes
- Skip link funcional, `inert` no mobile nav, `:focus-visible` global com calcita
- `aria-label`, `aria-expanded`, `aria-controls` no burger
- `<time datetime>` nos posts, `<address>` semântico, `aria-hidden` nos SVGs decorativos

### Itens para 10

| # | Problema | Arquivo:linha | Ação |
|---|---|---|---|
| 1 | `<h2>WhatsApp</h2>` no contato — não é conteúdo, é label de bloco | contato.astro:27 | Reclassificar ou usar eyebrow pattern |
| 2 | Cards do blog usam `<h2>` quando já existe h2 de seção acima — hierarquia quebrada | blog/index.astro:59 | Usar `<h3>` nos títulos dos cards |
| 3 | Mobile nav `<nav>` fora do `<header>` no DOM | Header.astro:197 | Mover para dentro do `<header>` |
| 4 | Mobile nav não fecha ao clicar em um link | Header.astro:208 | Listener de click nos links do mobile-nav |
| 5 | `role="region"` + `aria-label` ausentes nas sections principais | Todas as pages | Adicionar para navegação por regiões |

---

## 3. Performance / Web Vitals — 7,0 / 10

### Pontos fortes
- `loading="eager"` nas primeiras imagens, `lazy` nas demais
- `width`/`height` explícitos em todas as imagens — sem CLS
- `font-display: swap` na BetterSignature, `preconnect` para Google Fonts
- `{ passive: true }` no scroll listener do header
- Astro gera HTML estático — zero JS extra no bundle

### Itens para 10

| # | Problema | Arquivo:linha | Ação |
|---|---|---|---|
| 1 | `@import url(Google Fonts)` no CSS — bloqueia renderização (síncrono) | global.css:1 | Mover para `<link>` no `<head>` com media trick |
| 2 | Sem `fetchpriority="high"` na imagem LCP do hero | index.astro:110 | Adicionar `fetchpriority="high"` na hero__photo-img |
| 3 | Blog cards: `loading="eager"` em todas as imagens, incluindo abaixo da dobra | blog/index.astro:47 | `loading={i === 0 ? 'eager' : 'lazy'}` |
| 4 | Imagens JPG/PNG sem WebP ou AVIF | resultados.astro, sobre.astro | Usar `<Image>` do Astro ou converter |
| 5 | `transition: all` sobreviveu no WhatsApp float | WhatsAppCTA.astro:36 | Substituir por propriedades explícitas |
| 6 | IntersectionObserver duplicado em 6 páginas | Todas as pages | Mover para Base.astro uma vez |

---

## 4. SEO / Metadados — 8,0 / 10

### Pontos fortes
- JSON-LD `BeautySalon` completo: geo, openingHours, priceRange, areaServed, sameAs
- `BlogPosting` JSON-LD nos posts com author, publisher, datePublished, dateModified
- Canonical em todas as páginas, OG + Twitter Card completos, `og:locale: pt_BR`

### Itens para 10

| # | Problema | Arquivo:linha | Ação |
|---|---|---|---|
| 1 | `priceRange: 'R$75 – R$220'` — preços reais são R$150–R$250 | SEO.astro:48 | Atualizar para `'R$150 – R$250'` |
| 2 | Sem Breadcrumb JSON-LD nas páginas internas | Todas as páginas internas | Adicionar `BreadcrumbList` em serviços, sobre, resultados, blog |
| 3 | `openingHoursSpecification` não declara sábado como fechado — ambíguo para o Google | SEO.astro:45 | Adicionar entrada explícita de fechamento sáb/dom/seg |
| 4 | Sem `<meta name="robots" content="index, follow">` | Base.astro | Adicionar no head |
| 5 | Sem sitemap.xml referenciado | Base.astro | Instalar `@astrojs/sitemap` e `<link rel="sitemap">` |

---

## 5. Copywriting / Conteúdo — 7,5 / 10

### Pontos fortes
- Voz autoral consistente: objetiva, específica, sem floreios
- "Mapeamento Crystal" e "Lash Nap" como conceitos proprietários bem articulados
- Depoimentos reais com nomes e situações concretas
- FAQ cobre objeções reais de conversão
- CTAs com mensagem pré-preenchida por contexto de página

### Itens para 10

| # | Problema | Arquivo:linha | Ação |
|---|---|---|---|
| 1 | Hero h1 mistura "você" e "te" — `"no formato que te harmoniza"` | index.astro:77 | Uniformizar para "você" |
| 2 | `blogPreview` hard-coded com slugs que podem não existir no CMS | index.astro:59 | Usar `getCollection('blog').slice(0,3)` dinâmico |
| 3 | Sem urgência/escassez nos CTAs | Todos os CTAs | Adicionar indicador de disponibilidade real |
| 4 | Depoimentos na home sem estrelas visuais | index.astro:223 | Unificar com `home-testimonial__stars` como em resultados |
| 5 | Blog hero h1 "Blog" sem subtítulo elaborado | blog/index.astro:21 | Título composto como os outros heroes |

---

## 6. Responsividade / Mobile — 8,0 / 10

### Pontos fortes
- Mobile-first com breakpoints bem definidos
- WhatsApp float vira ícone circular em 480px
- `touch-action: manipulation` em todos os botões
- Container padding adaptável (20px → 32px → 48px)

### Itens para 10

| # | Problema | Arquivo:linha | Ação |
|---|---|---|---|
| 1 | `minmax(320px, 1fr)` nos cards do blog — overflow em telas ≤360px | blog/index.astro:81 | `minmax(min(320px, 100%), 1fr)` |
| 2 | `height: 460px` fixo na hero photo em mobile — alto demais em phones pequenos | index.astro:415 | `max-height: 60svh` |
| 3 | Breakpoint `860px` único no contato vs `768px` padrão do restante | contato.astro:126 | Padronizar para `768px` |
| 4 | Footer sem separação visual entre seções em mobile | Footer.astro:86 | `border-top` entre seções em mobile |

---

## 7. Componentes / Arquitetura — 8,5 / 10

### Pontos fortes
- Tokens CSS bem definidos e seguidos na maior parte
- Componentes bem isolados: Header, Footer, SEO, ServiceCard, WhatsAppCTA
- Sistema de temas de seção (`section--dark`, `section--calcita`, `section--calcita-brand`)

### Itens para 10

| # | Problema | Arquivo:linha | Ação |
|---|---|---|---|
| 1 | IntersectionObserver idêntico duplicado em 6 arquivos | Todas as pages | Mover para Base.astro |
| 2 | `.home-testimonial` e `.dep-card` são 100% idênticos | index.astro:582, resultados.astro:279 | Extrair `TestimonialCard.astro` |
| 3 | Array `services` duplicado em index e servicos | index.astro:5, servicos.astro:5 | Extrair para `src/data/services.ts` |
| 4 | `blogPreview` hard-coded vs CMS dinâmico | index.astro:59 | `getCollection('blog').slice(0,3)` |

---

## 8. Interatividade / UX — 7,5 / 10

### Pontos fortes
- Swiper com `pauseOnMouseEnter`, `prefers-reduced-motion`, `loop: true`
- PhotoSwipe para galeria — biblioteca certa
- FAQ com animação suave de altura
- Header com shadow ao scrollar
- Animações de entrada escalonadas no hero

### Itens para 10

| # | Problema | Arquivo:linha | Ação |
|---|---|---|---|
| 1 | **Scroll reveal é noop**: `.reveal` começa `opacity: 1` e `.reveal.is-visible` é idêntico — IntersectionObserver roda mas nada muda visualmente | global.css:357 | Definir estado inicial `opacity: 0; transform: translateY(24px)` ou remover tudo |
| 2 | Mobile nav não fecha ao clicar em link de navegação | Header.astro:208 | Listener de click nos links |
| 3 | Sem Astro View Transitions — navegação entre páginas é hard-reload | Base.astro | `import { ViewTransitions } from 'astro:transitions'` |
| 4 | FAQ `transitionend` pode acumular em cliques rápidos — sem abort | servicos.astro:381 | `{ once: true }` garantido ou AbortController |
| 5 | Sem skeleton/placeholder nas imagens ao carregar | Galeria e cards | `background: var(--calcita-soft)` nos containers |

---

## 9. Conversão / Funil — 8,0 / 10

### Pontos fortes
- WhatsApp fixo em todas as páginas
- Botão "Agendar" no header desktop e mobile
- CTAs com mensagem pré-preenchida por contexto
- Trust signals no hero (7+ anos, 4.8 estrelas, Meta Verified)
- FAQ cobre objeções reais

### Itens para 10

| # | Problema | Arquivo:linha | Ação |
|---|---|---|---|
| 1 | Social proof só aparece no Swiper abaixo da dobra — nada no hero imediato | index.astro | Mini-depoimento de destaque abaixo dos trust-items |
| 2 | Contato sem link direto para Maps além do iframe (bloqueável por ad-blockers) | contato.astro:89 | Botão "Abrir no Google Maps" sob o iframe |
| 3 | Mensagens WhatsApp das páginas internas genéricas demais | servicos.astro:187, resultados.astro:153 | Mensagens específicas por técnica/contexto |
| 4 | Sem social proof quantitativo | Hero | "500+ transformações" ou similar nos trust items |

---

## 10. Consistência de Sistema — 8,0 / 10

### Pontos fortes
- `global.css` centraliza tokens — poucas escapadas
- Pattern `eyebrow + h2 + p` usado sistematicamente
- `.btn` variants bem definidas

### Itens para 10

| # | Problema | Arquivo:linha | Ação |
|---|---|---|---|
| 1 | `style="color: #fff"` em h1s em 6 páginas — código morto (sobrescrito pelo !important do global.css) | sobre.astro:15, resultados.astro:57, servicos.astro:56, contato.astro:14, blog/index.astro:21, [...slug].astro:63 | Remover todas as ocorrências |
| 2 | `border-radius: 50px` no WA float e `12px` nas post-tags vs `--radius-pill: 4px` | WhatsAppCTA.astro:31, [...slug].astro:143 | Usar `var(--radius-pill)` |
| 3 | `transition: all` no WhatsApp float sobreviveu | WhatsAppCTA.astro:36 | Propriedades explícitas |
| 4 | Breakpoint `860px` único no contato | contato.astro:126 | Padronizar para `768px` |
