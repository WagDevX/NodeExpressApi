import { SQLDatabaseWrapper } from "../../../../folder/data/datasources/wrapper/sql-database-wrapper";
import { File } from "../../../domain/entities/file";
import { FileDataSource } from "../interface/file-data-source";

export class FileDataSourceImpl implements FileDataSource {
  private db: SQLDatabaseWrapper;
  constructor(db: SQLDatabaseWrapper) {
    this.db = db;
  }

  async createFile(file: File): Promise<void> {
    await this.db.query(
      `INSERT INTO files (fileName, downloadUrl, extension, owner, parentFolder, size) 
      VALUES ('${file.fileName}', ${file.downloadUrl}, ${file.extension}, '${file.owner}', '${file.parentFolder}', '${file.size}');`
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
  async findFileByFolder(id: number): Promise<File> {
    const result = await this.db.query(
      `SELECT * FROM files WHERE parentFolder = ${id};`
    );
    return result.rows[0];
  }

  async deleteFile(id: number): Promise<void> {
    await this.db.query(`DELETE FROM files WHERE id = ${id};`);
  }
}
