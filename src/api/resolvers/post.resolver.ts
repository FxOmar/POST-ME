export default {
  createNewPost: async (_, { input: { text } }, { prisma, user }) => {
    const newPost = await prisma.post.create({
      data: {
        text,
        profile: {
          connect: {
            id: user.profile.id,
          },
        },
      },
    });

    return newPost;
  },

  updatePost: async (_, { input: { id, text, likes } }, { prisma }) => {
    const updatedPost = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        text,
      },
    });

    return updatedPost;
  },
};
