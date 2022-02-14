import authResolver from "./auth.resolver";
import profileResolver from "./profile.resolver";
import postResolver from "./post.resolver";

const resolvers = {
  Mutation: {
    ...authResolver,
    ...profileResolver,
    ...postResolver,
  },

  Query: {
    async users(_, args, { prisma }) {
      return await prisma.user.findMany({
        include: {
          profile: true,
        },
      });
    },
  },
};

export default resolvers;
