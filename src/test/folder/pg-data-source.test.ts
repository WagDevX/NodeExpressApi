import { PGFolderDataSource } from "../../folder/data/datasources/impl/pg-folder-data-source";
import { SQLDatabaseWrapper } from "../../folder/data/datasources/wrapper/sql-database-wrapper";

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
        rows: [
          {
            id: 1,
            name: "folder1",
            owner: 1,
            ownername: "Admin",
            parentFolder: undefined,
          },
        ],
      })
    );
    const result = await ds.getFolders();
    expect(mockDataBase.query).toHaveBeenCalledWith(
      `WITH RECURSIVE RecursiveFolders AS (
        SELECT
            id,
            name,
            owner,
            ownername,
            parentfolder
        FROM
            folder
        WHERE
            parentfolder IS NULL
    
        UNION
    
        SELECT
            f.id,
            f.name,
            f.owner,
            f.ownername,
            f.parentfolder
        FROM
            folder f
        INNER JOIN
            RecursiveFolders rf ON f.parentfolder = rf.id
    )
    
    SELECT
        id,
        name,
        owner,
        ownername,
        parentfolder
    FROM
        RecursiveFolders;`
    );
  });

  test("findFolderById", async () => {
    const ds = new PGFolderDataSource(mockDataBase);

    jest.spyOn(mockDataBase, "query").mockImplementation(() =>
      Promise.resolve({
        rows: [
          {
            id: 1,
            name: "folder1",
            owner: 1,
            ownername: "Admin",
            parentFolder: undefined,
          },
        ],
      })
    );
    const result = await ds.findFolderById(1);
    expect(mockDataBase.query).toHaveBeenCalledWith(
      `SELECT * FROM folder WHERE id = 1 limit 1`
    );
  });

  test("findFoldersByOwner", async () => {
    const ds = new PGFolderDataSource(mockDataBase);

    jest.spyOn(mockDataBase, "query").mockImplementation(() =>
      Promise.resolve({
        rows: [
          {
            id: 1,
            name: "folder1",
            owner: 1,
            ownername: "Admin",
            parentFolder: undefined,
          },
        ],
      })
    );
    const result = await ds.findFoldersByOwner(1);
    expect(mockDataBase.query).toHaveBeenCalledWith(
      `WITH RECURSIVE RecursiveFolders AS (
        SELECT
            id,
            name,
            owner,
            ownername,
            parentfolder
        FROM
            folder
        WHERE
            parentfolder IS NULL AND owner = 1
          
        UNION
    
        SELECT
            f.id,
            f.name,
            f.owner,
            f.ownername,
            f.parentfolder
        FROM
            folder f
        INNER JOIN
            RecursiveFolders rf ON f.parentfolder = rf.id
    )
    
    SELECT
        id,
        name,
        owner,
        ownername,
        parentfolder
    FROM
        RecursiveFolders;`
    );
  });

  test("createFolder", async () => {
    const ds = new PGFolderDataSource(mockDataBase);

    const result = await ds.createFolder({
      id: 1,
      name: "folder1",
      owner: 1,
      ownerName: "Admin",
      parentFolder: undefined,
    });
    expect(mockDataBase.query).toHaveBeenNthCalledWith(
      1,
      `INSERT INTO folder (name, owner, ownername, parentFolder) VALUES ('folder1', 1, 'Admin', null)`
    );

    expect(mockDataBase.query).toHaveBeenCalledTimes(2);
  });

  test("renameFolder", async () => {
    const ds = new PGFolderDataSource(mockDataBase);

    const result = await ds.renameFolder(1, "folder1");
    expect(mockDataBase.query).toHaveBeenCalledWith(
      `UPDATE folder SET name = 'folder1' WHERE id = 1`
    );
    expect(result).toBeUndefined();
  });

  test("moveFolder", async () => {
    const ds = new PGFolderDataSource(mockDataBase);

    const result = await ds.moveFolder(1, 2);
    expect(mockDataBase.query).toHaveBeenCalledWith(
      `UPDATE folder SET parentFolder = 2 WHERE id = 1`
    );
    expect(result).toBeUndefined();
  });

  test("deleteFolder", async () => {
    const ds = new PGFolderDataSource(mockDataBase);

    const result = await ds.deleteFolder(1);
    expect(mockDataBase.query).toHaveBeenCalledWith(
      `DELETE FROM folder WHERE id = 1`
    );
    expect(result).toBeUndefined();
  });
});
