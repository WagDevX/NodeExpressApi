import { User } from "../entities/user";

export interface AuthRepository {
  loginWithUserNameAndPassword: (user: User) => Promise<User>;
  registerUser: (user: User) => Promise<User>;
  changeUserName: (
    token: string,
    id: number,
    username: string
  ) => Promise<boolean>;
  resetPassword: (
    token: string,
    id: number,
    password: string
  ) => Promise<boolean>;
  changeRole: (token: string, id: number, role: string) => Promise<boolean>;
  changePassword: (
    token: string,
    id: number,
    oldPassword: string,
    newPassword: string
  ) => Promise<boolean>;
  getUsers: (token: string) => Promise<User[]>;
}
