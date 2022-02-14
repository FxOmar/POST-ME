export default {
  editProfile: async (_, { id, fullName, bio }, { prisma }) => {
    const profile = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        profile: {
          update: {
            bio,
            fullName,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    return profile;
  },
};
