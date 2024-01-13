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

  test("should register user", async () => {
    const db = new AuthDataSourceImpl(mockDB);
    const user: User = {
      id: 1,
      username: "test",
      password: "test",
    };

    await db.registerUser(user);

    expect(mockDB.query).toHaveBeenCalledWith(
      `INSERT INTO users (username, password) VALUES ('test', 'test');`
    );
  });
});
