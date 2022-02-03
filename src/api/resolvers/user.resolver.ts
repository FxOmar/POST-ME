import { usersList } from "../../../MOCK_USERS";

export default (parent, args) => {
  return usersList.filter((user) => user.id === Number(args.id))[0];
};
