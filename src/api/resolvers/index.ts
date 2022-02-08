import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";

function generateTokens(user) {
  const tokenSecret = process.env.TOKEN_SECRET;

  const token = sign({ username: user.username }, tokenSecret);

  return {
    accessToken: token,
    refreshToken: token,
  };
}

const resolvers = {
  Mutation: {
    // login: async (_, { email, password }) => {
    //   return;
    // },
    register: async (_, { email, username, password }, { prisma }) => {
      const isUserRegistered = await prisma.user.findMany({
        where: { email: email },
      });

      if (isUserRegistered.length > 0) {
        throw new Error("User already registered!");
      }

      const hashedPassword = await hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
        },
      });

      const tokens = await generateTokens(user);

      return {
        ...tokens,
        me: user,
      };
    },
  },
  Query: {
    users(_, { prisma }) {
      return prisma.users.findMany({});
    },
  },
};

export default resolvers;
