import { Folder } from "../../../domain/entities/folder";
import { FoldersResponse } from "../../../domain/entities/folders-response";

export interface FolderDataSource {
  getFolders(): Promise<FoldersResponse[]>;
  findFolderById(id: number): Promise<Folder>;
  findFoldersByOwner(owner: number): Promise<Folder[]>;
  createFolder(folder: Folder): Promise<void>;
  renameFolder(id: number, name: string): Promise<void>;
  moveFolder(id: number, parentFolder: number): Promise<void>;
  deleteFolder(id: number): Promise<void>;
  getAllRootFoldersByOwner(owner: number): Promise<FoldersResponse[]>;
}
