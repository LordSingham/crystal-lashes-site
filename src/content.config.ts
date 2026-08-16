import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    // Titulo curto so para o Google, opcional. O Google corta por volta de 60
    // caracteres, e o titulo que funciona lendo o artigo quase nunca cabe la:
    // forcar um so estraga os dois. Sem este campo, cai no title.
    seoTitle: z.string().optional(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
