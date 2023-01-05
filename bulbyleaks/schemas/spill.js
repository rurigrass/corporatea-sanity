import { title } from "process";

export default {
  name: "spill",
  title: "Spill",
  type: "document",
  fields: [
    {
      name: "spill",
      title: "Spill",
      type: "string",
      options: {
        source: "title",
        maxLength: 140,
      },
    },
    {
      name: "company",
      title: "Company",
      type: "reference",
      to: { type: "company" },
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 40,
      },
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    },
    {
      name: "verified",
      title: "Verified",
      type: "boolean",
    },
    {
      name: "blockSpill",
      title: "Block Spill",
      description: "ADMIN Controls: Toggle if Spill is deemed inapropriate",
      type: "boolean",
    },
  ],
  initialValue: {
    blockSpill: false,
  },

  preview: {
    select: {
      title: "spill",
      company: "company.name",
      author: "author.name",
      media: "company.image",
    },
    prepare(selection) {
      const { company } = selection;
      return Object.assign({}, selection, {
        subtitle: company && `company: ${company}`,
      });
    },
  },
};
