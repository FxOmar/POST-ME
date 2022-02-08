export interface IUser {
  email: string;
  token: string;
  //   roles: string[];
  password: string;
}

export interface IContext {
  user: IUser;
  isAuthenticated: boolean;
}
