import { Folder } from "../entities/folder";
import { FoldersResponse } from "../entities/folders-response";

export interface FolderRepository {
  createFolder(folder: Folder): Promise<boolean>;

  getFolders(): Promise<FoldersResponse[]>;

  findFolderById(id: number): Promise<Folder>;

  findFoldersByOwner(owner: number): Promise<Folder[]>;

  moveFolder(id: number, parentFolder: number): Promise<boolean>;

  renameFolder(id: number, name: string): Promise<boolean>;

  deleteFolder(id: number): Promise<boolean>;
}
