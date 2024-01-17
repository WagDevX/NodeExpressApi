import { Folder } from "../../../domain/entities/folder";
import { FolderDataSource } from "../interfaces/folder-data-source";
import { SQLDatabaseWrapper } from "../wrapper/sql-database-wrapper";

const DB_TABLE = "folder";
export class PGFolderDataSource implements FolderDataSource {
  private db: SQLDatabaseWrapper;
  constructor(db: SQLDatabaseWrapper) {
    this.db = db;
  }

  async getFolders(): Promise<Folder[]> {
    const dbResponse = await this.db.query(`SELECT * FROM ${DB_TABLE}`);
    const result = dbResponse.rows.map((item) => {
      return {
        id: item.id,
        name: item.name,
        owner: item.owner,
        ownerName: item.ownername,
        parentFolder: item.parentfolder ? item.parentfolder : undefined,
      };
    });
    return result;
  }
  async findFolderById(id: number): Promise<Folder> {
    const dbResponse = await this.db.query(
      `SELECT * FROM ${DB_TABLE} WHERE id = ${id} limit 1`
    );
    const result = dbResponse.rows.map((item) => {
      return {
        id: item.id,
        name: item.name,
        owner: item.owner,
        ownerName: item.ownername,
        parentFolder: item.parentfolder ? item.parentfolder : undefined,
      };
    });
    return result[0];
  }
  async findFoldersByOwner(owner: number): Promise<Folder[]> {
    const dbResponse = await this.db.query(
      `SELECT * FROM ${DB_TABLE} WHERE owner = 1`
    );
    const result = dbResponse.rows.map((item) => {
      return {
        id: item.id,
        name: item.name,
        owner: item.owner,
        ownerName: item.ownername,
        parentFolder: item.parentfolder ? item.parentfolder : undefined,
      };
    });
    return result;
  }
  async createFolder(folder: Folder): Promise<void> {
    // await this.db.query(`CREATE TABLE IF NOT EXISTS ${DB_TABLE} (
    //   id SERIAL PRIMARY KEY,
    //   name VARCHAR(255) NOT NULL,
    //   parentFolder INTEGER REFERENCES Folder(id),
    //   owner INTEGER
    //   )`);
    console.log(folder);
    await this.db.query(
      `INSERT INTO ${DB_TABLE} (name, owner,ownerName, parentFolder) VALUES ('${
        folder.name
      }', ${folder.owner},${folder.ownerName}, ${folder.parentFolder ?? null})`
    );
  }
  async renameFolder(id: number, name: string): Promise<void> {
    await this.db.query(
      `UPDATE ${DB_TABLE} SET name = '${name}' WHERE id = ${id}`
    );
  }
  async moveFolder(id: number, parentFolder: number): Promise<void> {
    await this.db.query(
      `UPDATE ${DB_TABLE} SET parentFolder = ${parentFolder} WHERE id = ${id}`
    );
  }
  async deleteFolder(id: number): Promise<void> {
    await this.db.query(`DELETE FROM permissions WHERE folderid = ${id}`);
    await this.db.query(`DELETE FROM ${DB_TABLE} WHERE id = ${id}`);
  }
}
