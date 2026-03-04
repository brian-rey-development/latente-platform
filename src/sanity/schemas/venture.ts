import { defineField, defineType } from 'sanity'

const VERTICAL_OPTIONS = [
  { title: 'Healthtech', value: 'HEALTHTECH' },
  { title: 'Fintech', value: 'FINTECH' },
  { title: 'Agritech', value: 'AGRITECH' },
  { title: 'Proptech', value: 'PROPTECH' },
  { title: 'Legaltech', value: 'LEGALTECH' },
  { title: 'Edtech', value: 'EDTECH' },
  { title: 'Climatetech', value: 'CLIMATETECH' },
  { title: 'Otro', value: 'OTRO' },
]

const STATUS_OPTIONS = [
  { title: 'Stealth', value: 'STEALTH' },
  { title: 'Building', value: 'BUILDING' },
  { title: 'Launched', value: 'LAUNCHED' },
  { title: 'Acquired', value: 'ACQUIRED' },
]

export const ventureSchema = defineType({
  name: 'venture',
  title: 'Venture',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'vertical',
      title: 'Vertical',
      type: 'string',
      options: { list: VERTICAL_OPTIONS },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'status',
      title: 'Estado',
      type: 'string',
      options: { list: STATUS_OPTIONS },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'url',
      title: 'URL externa',
      type: 'url',
    }),
    defineField({
      name: 'foundedYear',
      title: 'Año de fundación',
      type: 'number',
    }),
    defineField({ name: 'taglineEn', title: 'Tagline (EN)', type: 'string' }),
    defineField({ name: 'descriptionEn', title: 'Description (EN)', type: 'text', rows: 4 }),
  ],
})
