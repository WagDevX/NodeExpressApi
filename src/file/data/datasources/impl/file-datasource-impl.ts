import { SQLDatabaseWrapper } from "../../../../folder/data/datasources/wrapper/sql-database-wrapper";
import { File } from "../../../domain/entities/file";
import { FileDataSource } from "../interface/file-data-source";

export class FileDataSourceImpl implements FileDataSource {
  private db: SQLDatabaseWrapper;
  constructor(db: SQLDatabaseWrapper) {
    this.db = db;
  }

  createFile(file: File): Promise<void> {
    throw new Error("Method not implemented.");
  }
  moveFile(id: number, parentFolder: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  renameFile(id: number, name: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findFileByFolder(id: number): Promise<File> {
    throw new Error("Method not implemented.");
  }
  deleteFile(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
