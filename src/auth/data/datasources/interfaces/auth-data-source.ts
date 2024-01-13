import { User } from "../../../domain/entities/user";

export interface AuthDataSource {
  loginWithUserNameAndPassword(user: User): Promise<User>;
  registerUser(user: User): Promise<User>;
  changeUserName(id: number, username: string): Promise<void>;
  resetPassword(id: number, password: string): Promise<void>;
  changeRole(id: number, role: string): Promise<void>;
  changePassword(
    id: number,
    oldPassword: string,
    newPassword: string
  ): Promise<void>;
  getUsers(): Promise<User[]>;
}
