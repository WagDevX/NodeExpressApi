import { File } from "../../../domain/entities/file";

export interface FileDataSource {
  createFile(file: File): Promise<File>;
  moveFile(id: number, parentFolder: number): Promise<void>;
  renameFile(id: number, name: string): Promise<void>;
  findFileByFolder(id: number, owner: number): Promise<File[]>;
  deleteFile(id: number): Promise<void>;
}
