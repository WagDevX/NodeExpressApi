import { FileDataSourceImpl } from "../../file/data/datasources/impl/file-datasource-impl";
import { File } from "../../file/domain/entities/file";
import { SQLDatabaseWrapper } from "../../folder/data/datasources/wrapper/sql-database-wrapper";

describe("File Data Source", () => {
  let mockDb: SQLDatabaseWrapper;

  beforeAll(() => {
    mockDb = {
      query: jest.fn(),
    };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should update the parent folder of the file", async () => {
    const db = new FileDataSourceImpl(mockDb);
    const fileId = 1;
    const parentFolderId = 2;

    await db.moveFile(fileId, parentFolderId);

    expect(mockDb.query).toHaveBeenCalledWith(
      `UPDATE files SET parentFolder = ${parentFolderId} WHERE id = ${fileId};`
    );
  });

  test("should update the name of the file", async () => {
    const db = new FileDataSourceImpl(mockDb);
    const fileId = 1;
    const newName = "new-file.txt";

    await db.renameFile(fileId, newName);

    expect(mockDb.query).toHaveBeenCalledWith(
      `UPDATE files SET fileName = ${newName} WHERE id = ${fileId};`
    );
  });

  test("should delete the file from the database", async () => {
    const db = new FileDataSourceImpl(mockDb);
    const fileId = 1;

    await db.deleteFile(fileId);

    expect(mockDb.query).toHaveBeenCalledWith(
      `DELETE FROM files WHERE id = ${fileId};`
    );
  });
});
