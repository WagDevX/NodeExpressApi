import { AuthDataSourceImpl } from "../../auth/data/datasources/impl/auth-data-source-impl";
import { AuthDataSource } from "../../auth/data/datasources/interfaces/auth-data-source";
import { User } from "../../auth/domain/entities/user";
import { SQLDatabaseWrapper } from "../../folder/data/datasources/wrapper/sql-database-wrapper";

describe("AuthDataSourceImpl", () => {
  let mockDB: SQLDatabaseWrapper;

  beforeAll(() => {
    mockDB = {
      query: jest.fn(),
    };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should register user and return", async () => {
    const db = new AuthDataSourceImpl(mockDB);

    const user: User = {
      id: 1,
      username: "test",
      password: "test",
    };
    const mockQueryResult = {
      rows: [user],
    };
    (mockDB.query as jest.Mock).mockResolvedValue(mockQueryResult);

    await db.registerUser(user);

    expect(mockDB.query).toHaveBeenNthCalledWith(
      1,
      `INSERT INTO users (username, password, role) VALUES ('${user.username}', '${user.password}', 'user')`
    );
    expect(mockDB.query).toHaveBeenNthCalledWith(
      2,
      `SELECT * FROM users WHERE username = ${user.username} AND password = ${user.password}`
    );
    expect(mockDB.query).toHaveBeenCalledTimes(2);
  });

  test("should login user and return", async () => {
    const db = new AuthDataSourceImpl(mockDB);

    const user: User = {
      id: 1,
      username: "test",
      password: "test",
    };
    const mockQueryResult = {
      rows: [user],
    };
    (mockDB.query as jest.Mock).mockResolvedValue(mockQueryResult);

    await db.loginWithUserNameAndPassword(user);

    expect(mockDB.query).toHaveBeenCalledWith(
      `SELECT * FROM users WHERE username = 'test' AND password = 'test'`
    );
  });

  test("should change username", async () => {
    const db = new AuthDataSourceImpl(mockDB);

    const id = 1;
    const username = "test";
    const mockQueryResult = {
      rows: [],
    };
    (mockDB.query as jest.Mock).mockResolvedValue(mockQueryResult);

    await db.changeUserName(id, username);

    expect(mockDB.query).toHaveBeenCalledWith(
      `UPDATE users SET username = ${username} WHERE id = ${id};`
    );
  });

  test("should reset password", async () => {
    const db = new AuthDataSourceImpl(mockDB);

    const id = 1;
    const password = "test";
    const mockQueryResult = {
      rows: [],
    };
    (mockDB.query as jest.Mock).mockResolvedValue(mockQueryResult);

    await db.resetPassword(id, password);

    expect(mockDB.query).toHaveBeenCalledWith(
      `UPDATE users SET password = ${password} WHERE id = ${id};`
    );
  });

  test("should change role", async () => {
    const db = new AuthDataSourceImpl(mockDB);

    const id = 1;
    const role = "test";
    const mockQueryResult = {
      rows: [],
    };
    (mockDB.query as jest.Mock).mockResolvedValue(mockQueryResult);

    await db.changeRole(id, role);

    expect(mockDB.query).toHaveBeenCalledWith(
      `UPDATE users SET role = ${role} WHERE id = ${id};`
    );
  });

  test("should change password", async () => {
    const db = new AuthDataSourceImpl(mockDB);

    const id = 1;
    const oldPassword = "test";
    const newPassword = "test";
    const mockQueryResult = {
      rows: [],
    };
    (mockDB.query as jest.Mock).mockResolvedValue(mockQueryResult);

    await db.changePassword(id, oldPassword, newPassword);

    expect(mockDB.query).toHaveBeenCalledWith(
      `UPDATE users SET password = ${newPassword} WHERE id = ${id} AND password = ${oldPassword};`
    );
  });

  test("should get users", async () => {
    const db = new AuthDataSourceImpl(mockDB);

    const user: User = {
      id: 1,
      username: "test",
      password: "test",
    };
    const mockQueryResult = {
      rows: [user],
    };
    (mockDB.query as jest.Mock).mockResolvedValue(mockQueryResult);

    await db.getUsers();

    expect(mockDB.query).toHaveBeenCalledWith(`SELECT * FROM users`);
  });

  test("should throw error when login failed", async () => {
    const db = new AuthDataSourceImpl(mockDB);

    const user: User = {
      id: 1,
      username: "test",
      password: "test",
    };
    const mockQueryResult = {
      rows: [],
    };
    (mockDB.query as jest.Mock).mockImplementation(async () =>
      Promise.reject(Error("Authentication failed"))
    );

    await expect(db.loginWithUserNameAndPassword(user)).rejects.toThrowError(
      "Authentication failed"
    );
  });
});
