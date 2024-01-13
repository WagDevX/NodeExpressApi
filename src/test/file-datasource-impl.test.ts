import { FileDataSourceImpl } from "../file/data/datasources/impl/file-datasource-impl";
import { File } from "../file/domain/entities/file";
import { SQLDatabaseWrapper } from "../folder/data/datasources/wrapper/sql-database-wrapper";

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

  test("should insert file into database", async () => {
    const db = new FileDataSourceImpl(mockDb);
    const file: File = {
      fileName: "test",
      downloadUrl: "http://example.com/test.txt",
      extension: "txt",
      owner: 1,
      parentFolder: 1,
      size: 1024,
    };

    await db.createFile(file);

    expect(mockDb.query).toHaveBeenCalledWith(
      `INSERT INTO files (fileName, downloadUrl, extension, owner, parentFolder, size) 
      VALUES ('${file.fileName}', ${file.downloadUrl}, ${file.extension}, '${file.owner}', '${file.parentFolder}', '${file.size}');`
    );
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

  test("should return the first file found in the specified folder", async () => {
    const db = new FileDataSourceImpl(mockDb);
    const folderId = 1;
    const expectedResult: File = {
      id: 1,
      fileName: "test.txt",
      downloadUrl: "http://example.com/test.txt",
      extension: "txt",
      owner: 1,
      parentFolder: 1,
      size: 1024,
    };
    const mockQueryResult = {
      rows: [expectedResult],
    };
    (mockDb.query as jest.Mock).mockResolvedValue(mockQueryResult);

    const result = await db.findFileByFolder(folderId);

    expect(mockDb.query).toHaveBeenCalledWith(
      `SELECT * FROM files WHERE parentFolder = ${folderId};`
    );
    expect(result).toEqual(expectedResult);
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
