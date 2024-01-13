import { SQLDatabaseWrapper } from "../../../../folder/data/datasources/wrapper/sql-database-wrapper";
import { User } from "../../../domain/entities/user";
import { AuthDataSource } from "../interfaces/auth-data-source";

export class AuthDataSourceImpl implements AuthDataSource {
  private db: SQLDatabaseWrapper;
  constructor(db: SQLDatabaseWrapper) {
    this.db = db;
  }

  loginWithUserNameAndPassword(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  registerUser(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  changeUserName(token: string, id: number, username: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  resetPassword(token: string, id: number, password: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  changeRole(token: string, id: number, role: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  changePassword(
    token: string,
    id: number,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getUsers(token: string): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
}
