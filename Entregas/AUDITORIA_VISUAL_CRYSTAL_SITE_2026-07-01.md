# Auditoria visual - Crystal Lashes Site

Data: 2026-07-01
Metodo: Browser/Chrome + Playwright, screenshots desktop em `_audit`, build Astro e inspecao visual.

## Veredito rapido

O site ja tem uma base boa: identidade clara, Calcita reconhecivel, tipografia elegante, conteudo comercial objetivo e fotos reais. O que ainda segurava o nivel premium era menos "branding" e mais acabamento: arredondamento infantil, heros sem padrao entre paginas, grids que pareciam sobrar espaco, imagens em lazy aparecendo como lacunas em QA full-page e Home hero ainda claro demais.

Depois dos ajustes desta rodada, a nota geral sobe de **7.1/10 para 8.2/10**. Para virar um site unico e realmente premium, o proximo salto precisa ser direcao de arte: fotos definitivas do studio, menos repeticao de blocos Calcita, composicoes mais editoriais e microdetalhes de navegacao/CTA.

## Notas por area

| Area | Antes | Agora | Diagnostico objetivo |
| --- | ---: | ---: | --- |
| Identidade visual | 7.5 | 8.3 | Calcita e assinatura sao memoraveis; ainda precisa mais textura proprietaria e menos repeticao de blocos lisos. |
| Home hero | 6.4 | 8.4 | Ganhou fundo Calcita, gradiente e Stefanie grande; pode evoluir com foto posada exclusiva e recorte mais editorial. |
| Heros internos | 6.7 | 8.0 | Servicos, Resultados, Blog e Contato agora ficam mais consistentes; Sobre segue maior por ter imagem de autoridade. |
| Cards e arredondamento | 6.2 | 8.6 | Raio global reduzido para 4px, removendo o tom infantil. |
| Home - Ambiente | 7.0 | 7.8 | Melhor com foto real de atendimento; fotos antigas do espaco ainda limitam o refinamento. |
| Home - Diferenciais | 7.8 | 7.8 | Forte conceitualmente, mas o bloco Calcita ainda e muito grande e uniforme. |
| Home - Servicos | 6.8 | 8.0 | Grid deixou de parecer quebrado; cards ainda podem ter hierarquia mais editorial. |
| Home - Resultados | 5.8 | 8.0 | Imagens agora carregam e ocupam o grid; galeria ainda pode ganhar antes/depois mais padronizado. |
| Home - Blog | 5.9 | 7.7 | Imagens agora carregam; cards ainda tem cara mais institucional que editorial premium. |
| Pagina Servicos | 7.2 | 7.8 | Boa clareza comercial; precisa menos texto denso por card e comparativo visual dos efeitos. |
| Pagina Resultados | 8.0 | 8.2 | E a prova social visual mais forte do site; falta curadoria/crop padrao por tecnica. |
| Pagina Sobre | 7.0 | 8.4 | Ganhou foto melhor, contadores estaticos corretos e galeria sem lacunas; texto ainda pode ser mais humano. |
| Blog | 6.8 | 7.4 | Estrutura correta; visual ainda nao parece revista/autoridade premium. |
| Contato | 7.4 | 7.8 | Simples e funcional; pode ter mapa/foto do predio/studio mais cuidado. |
| Performance visual | 6.5 | 8.5 | Fotos novas foram reduzidas de 8-11MB para ~110-260KB. |

## O que foi corrigido nesta rodada

- Copiadas fotos profissionais do acervo Dropbox para `public/fotos`.
- Substituidas fotos principais da Stefanie por imagens de atendimento mais fortes.
- Criado asset editorial de procedimento em `public/fotos/resultados/resultado-editorial.jpg`.
- Criado asset de atendimento em `public/fotos/espaco/espaco-atendimento.jpg`.
- Otimizadas as 5 fotos novas com `sharp`.
- Arredondamento global reduzido para 4px.
- Home hero recebeu fundo Calcita, imagem de apoio no fundo, gradiente de transicao e foto grande da Stefanie.
- Grids de servicos estabilizados em 2 colunas no desktop.
- Conteudo com `.reveal` deixou de ficar invisivel antes do JS, eliminando lacunas em screenshot.
- Imagens estruturais da Home/Sobre passaram para carregamento imediato quando necessario.
- Contadores da pagina Sobre foram travados como texto estatico para nao aparecerem em valores intermediarios.
- Build Astro validado com sucesso.
- Playwright/Chrome validou `revealHidden: 0` e `imgsMissing: []` em Home/Sobre finais.

## Plano de acao para virar premium unico

1. **Direcao de fotos**
   - Separar 12 fotos definitivas: 3 Stefanie, 3 procedimento, 3 resultado, 3 studio.
   - Evitar fotos antigas/documentais do espaco quando houver cabos, rua, obra ou baixa direcao de arte.
   - Padronizar crops por uso: hero vertical, cards 4:5, galerias 1:1, blog 16:9.

2. **Home acima da media**
   - Refinar o hero com uma foto de Stefanie mais "campanha", olhando/trabalhando com presenca.
   - Reduzir a massa de Calcita em secoes longas e usar Calcita como assinatura, nao como preenchimento.
   - Transformar resultados em bloco editorial com destaque para uma tecnica e miniaturas secundarias.

3. **Sistema visual**
   - Criar um unico padrao de hero interno: altura, espacamento, eyebrow, titulo e CTA.
   - Criar um padrao unico de cards: borda 4px, sombra minima, espaco interno consistente.
   - Criar tokens de imagem: `portrait`, `editorial`, `result`, `space`.

4. **Servicos**
   - Trocar cards densos por comparacao escaneavel: efeito, intensidade, indicado para, duracao, manutencao.
   - Adicionar uma imagem/crop por especialidade para reduzir cara de tabela.

5. **Resultados**
   - Padronizar antes/depois por tecnica.
   - Adicionar filtros visuais por efeito.
   - Priorizar fotos com mesma luz e distancia para aumentar confianca.

6. **Sobre**
   - Melhorar narrativa da Stefanie com menos texto institucional e mais voz propria.
   - Usar uma foto retrato forte, sem mascara, se existir no acervo ou em novo ensaio.

7. **Blog**
   - Reposicionar como revista de autoridade: cards maiores, imagens melhores e assinatura Crystal.
   - Manter poucos posts, mas visualmente muito bem acabados.

## Evidencias geradas

- Antes: `_audit/crystal-audit-home.png`, `_audit/crystal-audit-servicos.png`, `_audit/crystal-audit-resultados.png`, `_audit/crystal-audit-sobre.png`, `_audit/crystal-audit-blog.png`, `_audit/crystal-audit-contato.png`.
- Depois: `_audit/final/home.png`, `_audit/final/sobre.png`.
- Check JSON: `_audit/after/visual-check.json`.
- Build: `npm.cmd run build` concluido com sucesso.
