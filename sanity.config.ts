import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { artworkSchema } from './schemas/artwork'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'galeria-de-arte',
  title: 'Galeria — Alemão Vargas Moreira',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: S =>
        S.list()
          .title('Painel')
          .items([
            S.listItem()
              .title('Quadros')
              .schemaType('artwork')
              .child(S.documentTypeList('artwork').title('Quadros')),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: [artworkSchema],
  },
})
