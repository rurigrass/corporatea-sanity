export default {
  name: "spillComment",
  title: "SpillComment",
  type: "document",
  fields: [
    {
      name: "spill",
      type: "reference",
      to: [{ type: "spill" }],
    },
    {
      name: "comment",
      type: "text",
    },
    {
      name: "blockComment",
      title: "Block Comment",
      description: "ADMIN Controls: Toggle if Comment is deemed inapropriate",
      type: "boolean",
    },
  ],
  initialValue: {
    blockComment: false,
  },

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
