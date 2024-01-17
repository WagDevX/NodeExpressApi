import { Folder } from "../../../domain/entities/folder";
import { FoldersResponse } from "../../../domain/entities/folders-response";
import { FolderDataSource } from "../interfaces/folder-data-source";
import { SQLDatabaseWrapper } from "../wrapper/sql-database-wrapper";

const DB_TABLE = "folder";
export class PGFolderDataSource implements FolderDataSource {
  private db: SQLDatabaseWrapper;
  constructor(db: SQLDatabaseWrapper) {
    this.db = db;
  }

  async getFolders(): Promise<FoldersResponse[]> {
    const dbResponse = await this.db.query(
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

    const organizeFolders = (folders: FoldersResponse[]) => {
      const map = new Map<number, FoldersResponse>();

      folders.forEach((folder) => {
        const copy: FoldersResponse = {
          id: folder.id,
          name: folder.name,
          owner: folder.owner,
          ownerName: folder.ownerName, // Adicione a propriedade ownerName
          parentFolder: folder.parentFolder,
          children: [],
        };

        map.set(folder.id!, copy);

        if (folder.parentFolder !== null) {
          if (!map.has(folder.parentFolder!)) {
            // Crie uma entrada no mapa para o pai, se ainda não existir
            map.set(folder.parentFolder!, {
              id: folder.parentFolder,
              name: "",
              owner: 0,
              ownerName: "",
              parentFolder: undefined,
              children: [],
            });
          }
          map.get(folder.parentFolder!)!.children!.push(copy);
        }
      });

      return Array.from(map.values()).filter(
        (folder) => folder.parentFolder === null
      );
    };

    const result = dbResponse.rows.map((item) => ({
      id: item.id,
      name: item.name,
      owner: item.owner,
      ownerName: item.ownername,
      parentFolder: item.parentfolder,
    }));

    return organizeFolders(result);
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
            parentfolder IS NULL AND owner = ${owner}
          
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

    const organizeFolders = (folders: FoldersResponse[]) => {
      const map = new Map<number, FoldersResponse>();

      folders.forEach((folder) => {
        const copy: FoldersResponse = {
          id: folder.id,
          name: folder.name,
          owner: folder.owner,
          ownerName: folder.ownerName, // Adicione a propriedade ownerName
          parentFolder: folder.parentFolder,
          children: [],
        };

        map.set(folder.id!, copy);

        if (folder.parentFolder !== null) {
          if (!map.has(folder.parentFolder!)) {
            // Crie uma entrada no mapa para o pai, se ainda não existir
            map.set(folder.parentFolder!, {
              id: folder.parentFolder,
              name: "",
              owner: 0,
              ownerName: "",
              parentFolder: undefined,
              children: [],
            });
          }
          map.get(folder.parentFolder!)!.children!.push(copy);
        }
      });

      return Array.from(map.values()).filter(
        (folder) => folder.parentFolder === null
      );
    };

    const result = dbResponse.rows.map((item) => ({
      id: item.id,
      name: item.name,
      owner: item.owner,
      ownerName: item.ownername,
      parentFolder: item.parentfolder,
    }));

    return organizeFolders(result);
  }
  async createFolder(folder: Folder): Promise<void> {
    // await this.db.query(`CREATE TABLE IF NOT EXISTS ${DB_TABLE} (
    //   id SERIAL PRIMARY KEY,
    //   name VARCHAR(255) NOT NULL,
    //   parentFolder INTEGER REFERENCES Folder(id),
    //   owner INTEGER REFERENCES Folder(id),
    //   owner VARCHAR(255) REFERENCES User(username)
    //   )`);
    console.log(folder);
    await this.db.query(
      `INSERT INTO ${DB_TABLE} (name, owner, ownerName, parentFolder) VALUES ('${
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
