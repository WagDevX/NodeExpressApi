import { User } from "../../../domain/entities/user";

export interface AuthDataSource {
  loginWithUserNameAndPassword(user: User): Promise<User>;
  registerUser(user: User): Promise<User>;
  changeUserName(token: string, id: number, username: string): Promise<void>;
  resetPassword(token: string, id: number, password: string): Promise<void>;
  changeRole(token: string, id: number, role: string): Promise<void>;
  changePassword(
    token: string,
    id: number,
    oldPassword: string,
    newPassword: string
  ): Promise<void>;
  getUsers(token: string): Promise<User[]>;
}
