export default {
  name: "comment",
  title: "Comment",
  type: "document",
  fields: [
    {
      title: "Approved",
      name: "approved",
      type: "boolean",
      description: "Comments won't show on the site without approval",
    },
    {
      name: "comment",
      type: "text",
    },
    {
      name: "post",
      type: "reference",
      to: [{ type: "post" }],
    },
  ],

  preview: {
    select: {
      title: "comment",
      post: "post.title",
    },
    prepare(selection) {
      const { post } = selection;
      return Object.assign({}, selection, {
        subtitle: post && `post: ${post}`,
      });
    },
  },
};
