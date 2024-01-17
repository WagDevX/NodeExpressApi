import { File } from "../entities/file";

export interface FileRepository {
  createFile(file: File): Promise<File>;

  moveFile(id: number, parentFolder: number): Promise<boolean>;

  renameFile(id: number, name: string): Promise<boolean>;

  findFileByFolder(id: number, owner: number): Promise<File[]>;

  deleteFile(id: number): Promise<boolean>;
}
