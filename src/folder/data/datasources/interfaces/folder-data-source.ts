import { Folder } from "../../../domain/entities/folder";

export interface FolderDataSource {
  getFolders(): Promise<Folder[]>;
  createFolder(
    name: string,
    owner: number,
    parentFolder?: number
  ): Promise<number>;
  renameFolder(id: number, name: string): Promise<boolean>;
  moveFolder(id: number, parentFolder: number): Promise<boolean>;
  deleteFolder(id: number): Promise<boolean>;
}
