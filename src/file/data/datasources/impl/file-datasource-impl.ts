import { SQLDatabaseWrapper } from "../../../../folder/data/datasources/wrapper/sql-database-wrapper";
import { File } from "../../../domain/entities/file";
import { FileDataSource } from "../interface/file-data-source";

export class FileDataSourceImpl implements FileDataSource {
  private db: SQLDatabaseWrapper;
  constructor(db: SQLDatabaseWrapper) {
    this.db = db;
  }

  async createFile(file: File): Promise<void> {
    console.log(file);
    const parentFolderValue =
      file.parentFolder != null ? `'${file.parentFolder}'` : "NULL";
    await this.db.query(
      `INSERT INTO files (fileName, owner, ownername, downloadUrl, parentfolder, extension, size) VALUES ('${file.fileName}', ${file.owner}, '${file.ownerName}', '${file.downloadUrl}', ${parentFolderValue}, '${file.extension}', ${file.size});`
    );
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
    console.log(id);
    const result = await this.db.query(
      `SELECT * FROM files WHERE owner = $1 AND (parentfolder = $2 OR parentfolder IS NULL)`,
      [owner, isNaN(id) ? null : id]
    );
    return result.rows;
  }

  async deleteFile(id: number): Promise<void> {
    await this.db.query(`DELETE FROM files WHERE id = ${id};`);
  }
}
