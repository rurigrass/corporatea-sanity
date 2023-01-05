export default {
  name: "spillComment",
  title: "SpillComment",
  type: "document",
  fields: [
    {
      title: "Approved",
      name: "approved",
      type: "boolean",
      description: "Comments won't show on the site without user approval",
    },
    {
      name: "blockComment",
      title: "Block Comment",
      description: "ADMIN Controls: Toggle if Comment is deemed inapropriate",
      type: "boolean",
    },
    {
      name: "comment",
      type: "text",
    },
    {
      name: "spill",
      type: "reference",
      to: [{ type: "spill" }],
    },
  ],

  preview: {
    select: {
      title: "comment",
      spill: "spill.title",
    },
    prepare(selection) {
      const { post } = selection;
      return Object.assign({}, selection, {
        subtitle: post && `post: ${post}`,
      });
    },
  },
};
