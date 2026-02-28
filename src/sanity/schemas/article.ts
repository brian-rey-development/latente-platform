import { defineField, defineType } from 'sanity'

const CATEGORY_OPTIONS = [
  { title: 'Geopolítica', value: 'GEOPOLÍTICA' },
  { title: 'Inteligencia Artificial', value: 'INTELIGENCIA ARTIFICIAL' },
  { title: 'Bio-Ingeniería', value: 'BIO-INGENIERÍA' },
  { title: 'Cultura Sintética', value: 'CULTURA SINTÉTICA' },
  { title: 'Economía', value: 'ECONOMÍA' },
]

export const articleSchema = defineType({
  name: 'article',
  title: 'Artículo',
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
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'string',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publicado el',
      type: 'datetime',
    }),
    defineField({
      name: 'readTimeMinutes',
      title: 'Tiempo de lectura (minutos)',
      type: 'number',
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de portada',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'content',
      title: 'Contenido',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({ name: 'titleEn', title: 'Title (EN)', type: 'string' }),
    defineField({ name: 'excerptEn', title: 'Excerpt (EN)', type: 'text', rows: 3 }),
    defineField({
      name: 'contentEn',
      title: 'Content (EN)',
      type: 'array',
      of: [{ type: 'block' }],
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
