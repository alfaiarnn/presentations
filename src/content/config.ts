import { defineCollection, z } from 'astro:content';

// Componentes reutilizáveis do schema
const contentBlockSchema = z.object({
  label: z.enum(['O que é', 'Desafio', 'Solução', 'Status atual']),
  text: z.string(),
  badge: z.object({
    text: z.enum(['Em operação', 'Em desenvolvimento']),
    variant: z.enum(['active', 'wip']),
  }).optional(),
});

const chipSchema = z.object({
  label: z.string(),
  icon: z.string().optional(),
});

const pillarSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
});

const productCardSchema = z.object({
  name: z.string(),
  fullName: z.string(),
  description: z.string(),
  status: z.enum(['active', 'wip']),
  badgeText: z.enum(['Em operação', 'Em desenvolvimento']),
  icon: z.string().optional(),
});

const kpiSchema = z.object({
  value: z.number(),
  label: z.string(),
  caption: z.string().optional(),
});

const slides = defineCollection({
  type: 'data',
  schema: z.object({
    // Metadados do slide
    order: z.number(),
    id: z.string(),
    layout: z.enum([
      'SlideHero',
      'SlideOverviewGrid',
      'SlideProductDetail',
      'SlideContext',
      'SlideClosing',
    ]),
    theme: z.enum(['dark', 'light', 'light-alt', 'green-light']),
    navLabel: z.string(),

    // Conteúdo comum
    eyebrow: z.string().optional(),
    title: z.string(),
    subtitle: z.string().optional(),

    // Hero (S01)
    heroHeader: z.string().optional(),
    highlightedTitle: z.string().optional(),

    // Overview Grid (S02)
    products: z.array(productCardSchema).optional(),

    // Product Detail (S03-S06)
    contentBlocks: z.array(contentBlockSchema).optional(),
    mockupAlt: z.string().optional(),
    mockupSrc: z.string().optional(),
    pillars: z.array(pillarSchema).optional(),
    chips: z.array(chipSchema).optional(),
    problemsList: z.array(z.string()).optional(),
    kpi: kpiSchema.optional(),

    // Context (slide de contexto estratégico)
    contextItems: z.array(z.object({
      icon: z.string().optional(),
      title: z.string(),
      text: z.string(),
    })).optional(),

    // Closing (S07)
    closingTitle: z.string().optional(),
    closingSubtitle: z.string().optional(),
    closingLines: z.array(z.string()).optional(),
    closingFooter: z.string().optional(),

    // CTA (encerramento com próximos passos)
    cta: z.object({
      label: z.string(),
      items: z.array(z.object({
        text: z.string(),
        icon: z.string().optional(),
      })),
    }).optional(),

    // Divider
    divider: z.enum(['default', 'brand']).optional(),
  }),
});

export const collections = { slides };
