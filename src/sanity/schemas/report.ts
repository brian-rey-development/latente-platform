import { defineField, defineType } from 'sanity'

const TOPIC_OPTIONS = [
  { title: 'Inteligencia Artificial', value: 'INTELIGENCIA ARTIFICIAL' },
  { title: 'Bio-Ingeniería', value: 'BIO-INGENIERÍA' },
  { title: 'Geopolítica', value: 'GEOPOLÍTICA' },
  { title: 'Economía', value: 'ECONOMÍA' },
  { title: 'Infraestructura', value: 'INFRAESTRUCTURA' },
  { title: 'Cultura', value: 'CULTURA' },
]

export const reportSchema = defineType({
  name: 'report',
  title: 'Reporte',
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
      name: 'topic',
      title: 'Tema',
      type: 'string',
      options: { list: TOPIC_OPTIONS },
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
      name: 'pageCount',
      title: 'Páginas',
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
  ],
  orderings: [
    {
      title: 'Fecha (reciente)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
