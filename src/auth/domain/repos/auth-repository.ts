import { User } from "../entities/user";

export interface AuthRepository {
  loginWithUserNameAndPassword(user: User): Promise<User>;
  registerUser(user: User): Promise<User>;
  changeUserName(id: number, username: string): Promise<boolean>;
  resetPassword(id: number, password: string): Promise<boolean>;
  changeRole(id: number, role: string): Promise<boolean>;
  changePassword(
    id: number,
    oldPassword: string,
    newPassword: string
  ): Promise<boolean>;
  getUsers(): Promise<User[]>;
}
