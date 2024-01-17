import config from "../../../../core/config/auth-config";
import { SQLDatabaseWrapper } from "../../../../folder/data/datasources/wrapper/sql-database-wrapper";
import { User } from "../../../domain/entities/user";
import { AuthDataSource } from "../interfaces/auth-data-source";
var jwt = require("jsonwebtoken");

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
    } else {
      const token = jwt.sign({ user_id: result.rows[0].id }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

      const response = result.rows[0];
      response.accessToken = token;
      return response;
    }
  }
  async registerUser(user: User): Promise<User> {
    await this.db.query(
      `INSERT INTO users (username, password, role) VALUES ('${user.username}', '${user.password}', 'user')`
    );
    const result = await this.db.query(
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

    return result.rows.map((usuario) => ({
      ...usuario,
      password: null,
    }));
  }
}
