import users from "./users.resolver";
// import user from "./user.resolver";

const resolvers = {
  Query: {
    users,
    // user,
  },
};

export default resolvers;
