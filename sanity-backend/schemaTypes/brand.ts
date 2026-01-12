import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'brand',
  title: 'Brand',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Brand Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Brand Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cataloguePdf',
      title: 'Legacy Catalogue PDF (Deprecated)',
      type: 'file',
      description: 'This field is deprecated. Use "Catalogue PDFs" instead.',
      options: {
        accept: '.pdf',
      },
      hidden: true, // Hide from the editor
    }),
    defineField({
      name: 'cataloguePdfs',
      title: 'Catalogue PDFs',
      type: 'array',
      description: 'Upload multiple brand catalogue PDFs (up to 15)',
      validation: (Rule) => Rule.max(15),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'PDF Title',
              type: 'string',
              description: 'Display name for this PDF',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'file',
              title: 'PDF File',
              type: 'file',
              options: {
                accept: '.pdf',
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              description: 'Optional description of this catalogue',
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'categories',
      title: 'Product Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Category Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'image',
              title: 'Category Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'name',
              media: 'image',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
    },
  },
})
