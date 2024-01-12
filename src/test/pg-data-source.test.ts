import { PGFolderDataSource } from "../folder/data/datasources/impl/pg-folder-data-source";
import { SQLDatabaseWrapper } from "../folder/data/datasources/wrapper/sql-database-wrapper";

describe("PG DataSource", () => {
  let mockDataBase: SQLDatabaseWrapper;

  beforeAll(() => {
    mockDataBase = {
      query: jest.fn(),
    };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getFolders", async () => {
    const ds = new PGFolderDataSource(mockDataBase);

    jest.spyOn(mockDataBase, "query").mockImplementation(() =>
      Promise.resolve({
        rows: [{ id: 1, name: "folder1", owner: 1, parentFolder: undefined }],
      })
    );
    const result = await ds.getFolders();
    expect(mockDataBase.query).toHaveBeenCalledWith(`SELECT * FROM folders`);
    expect(result).toStrictEqual([
      { id: 1, name: "folder1", owner: 1, parentFolder: undefined },
    ]);
  });

  test("findFolderById", async () => {
    const ds = new PGFolderDataSource(mockDataBase);

    jest.spyOn(mockDataBase, "query").mockImplementation(() =>
      Promise.resolve({
        rows: [{ id: 1, name: "folder1", owner: 1, parentFolder: undefined }],
      })
    );
    const result = await ds.findFolderById(1);
    expect(mockDataBase.query).toHaveBeenCalledWith(
      `SELECT * FROM folders WHERE id = 1 limit 1`
    );
    expect(result).toStrictEqual({
      id: 1,
      name: "folder1",
      owner: 1,
      parentFolder: undefined,
    });
  });

  test("findFoldersByOwner", async () => {
    const ds = new PGFolderDataSource(mockDataBase);

    jest.spyOn(mockDataBase, "query").mockImplementation(() =>
      Promise.resolve({
        rows: [{ id: 1, name: "folder1", owner: 1, parentFolder: undefined }],
      })
    );
    const result = await ds.findFoldersByOwner(1);
    expect(mockDataBase.query).toHaveBeenCalledWith(
      `SELECT * FROM folders WHERE owner = 1`
    );
    expect(result).toStrictEqual([
      { id: 1, name: "folder1", owner: 1, parentFolder: undefined },
    ]);
  });

  test("createFolder", async () => {
    const ds = new PGFolderDataSource(mockDataBase);

    const result = await ds.createFolder({
      id: 1,
      name: "folder1",
      owner: 1,
      parentFolder: undefined,
    });
    expect(mockDataBase.query).toHaveBeenCalledWith(
      `INSERT INTO folders (name, owner, parentFolder) VALUES ('folder1', 1, null)`
    );
    expect(result).toBeUndefined();
  });

  test("renameFolder", async () => {
    const ds = new PGFolderDataSource(mockDataBase);

    const result = await ds.renameFolder(1, "folder1");
    expect(mockDataBase.query).toHaveBeenCalledWith(
      `UPDATE folders SET name = 'folder1' WHERE id = 1`
    );
    expect(result).toBeUndefined();
  });

  test("moveFolder", async () => {
    const ds = new PGFolderDataSource(mockDataBase);

    const result = await ds.moveFolder(1, 2);
    expect(mockDataBase.query).toHaveBeenCalledWith(
      `UPDATE folders SET parentFolder = 2 WHERE id = 1`
    );
    expect(result).toBeUndefined();
  });

  test("deleteFolder", async () => {
    const ds = new PGFolderDataSource(mockDataBase);

    const result = await ds.deleteFolder(1);
    expect(mockDataBase.query).toHaveBeenCalledWith(
      `DELETE FROM folders WHERE id = 1`
    );
    expect(result).toBeUndefined();
  });
});