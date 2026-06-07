import { defineField, defineType } from 'sanity'

export const artworkSchema = defineType({
  name: 'artwork',
  title: 'Quadro',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL (gerado automaticamente)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Foto da Obra',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Descrição da imagem', type: 'string' }),
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Preço (R$)',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    }),
    defineField({
      name: 'inStock',
      title: 'Disponível para venda',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Retrato', value: 'Retrato' },
          { title: 'Natureza Morta', value: 'Natureza Morta' },
          { title: 'Paisagem', value: 'Paisagem' },
          { title: 'Cena Urbana', value: 'Cena Urbana' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'medium',
      title: 'Técnica',
      type: 'string',
      initialValue: 'Óleo sobre tela',
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensões (ex: 60 × 80 cm)',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Ano',
      type: 'number',
      initialValue: new Date().getFullYear(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'artist',
      title: 'Artista',
      type: 'string',
      initialValue: 'Alemão Vargas Moreira',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      price: 'price',
      inStock: 'inStock',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare({ title, media, price, inStock }: any) {
      return {
        title,
        media,
        subtitle: `R$ ${price?.toLocaleString('pt-BR')} — ${inStock ? 'Disponível' : 'Vendido'}`,
      }
    },
  },
})
