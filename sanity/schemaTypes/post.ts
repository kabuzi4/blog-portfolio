import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Título", type: "string" }),
    defineField({
      name: "slug",
      title: "Slug (URL do post)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "mainImage",
      title: "Imagem de capa",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      options: {
        list: [
          { title: "Liderança",                value: "Liderança" },
          { title: "Gestão Ágil",              value: "Gestão Ágil" },
          { title: "Dados & BI",               value: "Dados & BI" },
          { title: "Ferramentas para Líderes", value: "Ferramentas para Líderes" },
        ],
      },
    }),
    defineField({ name: "excerpt", title: "Resumo", type: "text", rows: 3 }),
    defineField({ name: "publishedAt", title: "Data de publicação", type: "datetime" }),
    defineField({ name: "readTime", title: "Tempo de leitura", type: "string" }),
    defineField({
      name: "body",
      title: "Conteúdo do artigo",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal",    value: "normal" },
            { title: "Título H2", value: "h2" },
            { title: "Título H3", value: "h3" },
            { title: "Citação",   value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Negrito", value: "strong" },
              { title: "Itálico", value: "em" },
              { title: "Código",  value: "code" },
            ],
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "mainImage" },
  },
});