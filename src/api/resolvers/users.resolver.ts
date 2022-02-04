import { Context } from "../../context";

export default (_parent, _args, context: Context) => {
  return context.prisma.user.findMany({});
};
