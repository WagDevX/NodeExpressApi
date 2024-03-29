import { SQLDatabaseWrapper } from "../../../../folder/data/datasources/wrapper/sql-database-wrapper";
import { File } from "../../../domain/entities/file";
import { FileDataSource } from "../interface/file-data-source";

export class FileDataSourceImpl implements FileDataSource {
  private db: SQLDatabaseWrapper;
  constructor(db: SQLDatabaseWrapper) {
    this.db = db;
  }

  async createFile(file: File): Promise<File> {
    console.log(file);
    const parentFolderValue =
      file.parentFolder != null ? `'${file.parentFolder}'` : "NULL";
    await this.db.query(
      `INSERT INTO files (fileName, owner, ownername, downloadUrl, parentfolder, extension, size) VALUES ('${file.fileName}', ${file.owner}, '${file.ownerName}', '${file.downloadUrl}', ${parentFolderValue}, '${file.extension}', ${file.size});`
    );
    const dbResponse = await this.db.query(
      `SELECT * FROM files WHERE filename = $1 AND owner = $2 AND (parentfolder = $3 OR parentfolder IS NULL)`,
      [file.fileName, file.owner, file.parentFolder]
    );
    const result = dbResponse.rows.map((item) => {
      return {
        id: item.id,
        fileName: item.filename,
        downloadUrl: item.downloadurl,
        owner: item.owner,
        ownerName: item.ownername,
        extension: item.extension,
        size: item.size,
        parentFolder: item.parentfolder,
      };
    });
    return result[0];
  }

  async moveFile(id: number, parentFolder: number): Promise<void> {
    await this.db.query(
      `UPDATE files SET parentFolder = ${parentFolder} WHERE id = ${id};`
    );
  }

  async renameFile(id: number, name: string): Promise<void> {
    await this.db.query(
      `UPDATE files SET fileName = ${name} WHERE id = ${id};`
    );
  }

  async findFileByFolder(id: number, owner: number): Promise<File[]> {
    if (isNaN(id)) {
      const rootResults = await this.db.query(
        `SELECT * FROM files WHERE owner = $1 AND parentfolder IS NULL`,
        [owner]
      );
      return rootResults.rows.map((item) => {
        return {
          id: item.id,
          fileName: item.filename,
          downloadUrl: item.downloadurl,
          owner: item.owner,
          ownerName: item.ownername,
          extension: item.extension,
          size: item.size,
          parentFolder: item.parentfolder,
        };
      });
    } else {
      const parentResults = await this.db.query(
        `SELECT * FROM files WHERE owner = $1 AND parentfolder = $2`,
        [owner, id]
      );
      return parentResults.rows.map((item) => {
        return {
          id: item.id,
          fileName: item.filename,
          downloadUrl: item.downloadurl,
          owner: item.owner,
          ownerName: item.ownername,
          extension: item.extension,
          size: item.size,
          parentFolder: item.parentfolder,
        };
      });
    }
  }

  async deleteFile(id: number): Promise<void> {
    await this.db.query(`DELETE FROM files WHERE id = ${id};`);
  }
}
