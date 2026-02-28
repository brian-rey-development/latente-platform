import { defineField, defineType } from 'sanity'

const PRODUCT_TYPE_OPTIONS = [
  { title: 'Digital', value: 'DIGITAL' },
  { title: 'Físico', value: 'FÍSICO' },
  { title: 'Merch', value: 'MERCH' },
  { title: 'Suscripción', value: 'SUSCRIPCIÓN' },
]

export const productSchema = defineType({
  name: 'product',
  title: 'Producto',
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
      name: 'productType',
      title: 'Tipo',
      type: 'string',
      options: { list: PRODUCT_TYPE_OPTIONS },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'price',
      title: 'Precio (USD)',
      type: 'number',
      validation: (r) => r.required().positive(),
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
