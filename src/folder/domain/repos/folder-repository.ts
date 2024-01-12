import { Folder } from "../entities/folder";

export interface FolderRepository {
  createFolder(folder: Folder): Promise<boolean>;

  getFolders(): Promise<Folder[]>;

  findFoldersByOwner(owner: number): Promise<Folder[]>;

  moveFolder(id: number, parentFolder: number): Promise<boolean>;

  renameFolder(id: number, name: string): Promise<boolean>;

  deleteFolder(id: number): Promise<boolean>;
}
