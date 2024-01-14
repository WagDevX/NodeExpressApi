import { SQLDatabaseWrapper } from "../../../../folder/data/datasources/wrapper/sql-database-wrapper";
import { User } from "../../../domain/entities/user";
import { AuthDataSource } from "../interfaces/auth-data-source";

export class AuthDataSourceImpl implements AuthDataSource {
  private db: SQLDatabaseWrapper;
  constructor(db: SQLDatabaseWrapper) {
    this.db = db;
  }

  async loginWithUserNameAndPassword(user: User): Promise<User> {
    const result = await this.db.query(
      `SELECT * FROM users WHERE username = '${user.username}' AND password = '${user.password}'`
    );
    if (result.rows.length === 0) {
      throw new Error("Authentication failed");
    }
    return result.rows[0];
  }
  async registerUser(user: User): Promise<User> {
    const result = await this.db.query(
      `INSERT INTO users (username, password, role) VALUES (${user.username}, ${user.password}, 'user') \n` +
        `SELECT * FROM users WHERE username = ${user.username} AND password = ${user.password}`
    );
    return result.rows[0];
  }
  async changeUserName(id: number, username: string): Promise<void> {
    await this.db.query(
      `UPDATE users SET username = ${username} WHERE id = ${id};`
    );
  }
  async resetPassword(id: number, password: string): Promise<void> {
    await this.db.query(
      `UPDATE users SET password = ${password} WHERE id = ${id};`
    );
  }
  async changeRole(id: number, role: string): Promise<void> {
    await this.db.query(`UPDATE users SET role = ${role} WHERE id = ${id};`);
  }
  async changePassword(
    id: number,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    await this.db.query(
      `UPDATE users SET password = ${newPassword} WHERE id = ${id} AND password = ${oldPassword};`
    );
  }

  async getUsers(): Promise<User[]> {
    const result = await this.db.query(`SELECT * FROM users`);
    return result.rows;
  }
}
