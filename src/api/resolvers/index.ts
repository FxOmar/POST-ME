import { hash, compare } from "bcrypt";

import { generateToken } from "../../utils/JWT";

/**
 * @param prisma
 * @param email
 *
 * @returns User Object by email.
 */
const getUser = (prisma, email) =>
  prisma.user.findUnique({
    where: {
      email: email,
    },
  });

const resolvers = {
  Mutation: {
    /**
     * User login resolver.
     */
    login: async (_, { email, password }, { prisma }) => {
      const user = await getUser(prisma, email);

      if (!user) throw new Error("User not found");

      const isPasswordValid = await compare(password, user.password);

      if (!isPasswordValid) throw new Error("Invalid password");

      const token = await generateToken(user);

      return {
        token,
        me: user,
      };
    },

    /**
     * Sign up new user.
     */
    register: async (
      _,
      { email, username, password, fullName },
      { prisma }
    ) => {
      const isUserRegistered = await getUser(prisma, email);

      if (isUserRegistered) {
        throw new Error("User already registered!");
      }

      const hashedPassword = await hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
          profile: {
            create: {
              fullName: fullName,
            },
          },
        },
      });

      const token = await generateToken(user);

      return {
        token,
        me: user,
      };
    },
  },

  Query: {
    async users(_, args, { prisma }) {
      return await prisma.user.findMany({});
    },
  },
};

export default resolvers;
