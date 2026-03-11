import { defineField, defineType } from 'sanity'

const CATEGORY_OPTIONS = [
  { title: 'Inteligencia Artificial', value: 'INTELIGENCIA ARTIFICIAL' },
  { title: 'Bio-Ingeniería', value: 'BIO-INGENIERÍA' },
  { title: 'Geopolítica', value: 'GEOPOLÍTICA' },
  { title: 'Economía', value: 'ECONOMÍA' },
  { title: 'Infraestructura', value: 'INFRAESTRUCTURA' },
  { title: 'Cultura', value: 'CULTURA' },
]

export const signalSchema = defineType({
  name: 'signal',
  title: 'Señal',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: { list: CATEGORY_OPTIONS },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'premium',
      title: 'Contenido Premium',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'excerpt',
      title: 'Extracto',
      type: 'text',
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publicado el',
      type: 'datetime',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'content',
      title: 'Contenido',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'sources',
      title: 'Fuentes (ES)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'titleEn', title: 'Title (EN)', type: 'string' }),
    defineField({
      name: 'slugEn',
      title: 'Slug (EN)',
      type: 'slug',
      options: { source: 'titleEn' },
    }),
    defineField({ name: 'excerptEn', title: 'Excerpt (EN)', type: 'text', rows: 3 }),
    defineField({
      name: 'contentEn',
      title: 'Content (EN)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'sourcesEn',
      title: 'Sources (EN)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  orderings: [
    {
      title: 'Fecha (reciente)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
