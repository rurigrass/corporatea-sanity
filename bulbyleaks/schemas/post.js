export default {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      description: "Keep the titles short!",
      type: "string",
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
        maxLength: 96,
      },
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
    },
    {
      name: "verified",
      title: "Verified",
      type: "boolean",
    },
  ],

  preview: {
    select: {
      title: "title",
      company: "company.name",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { company } = selection;
      return Object.assign({}, selection, {
        subtitle: company && `company: ${company}`,
      });
    },
  },
};
