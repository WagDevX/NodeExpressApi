import { Folder } from "../../../domain/entities/folder";
import { FolderRepository } from "../../../domain/repos/folder-repository";
import { FolderDataSource } from "../interfaces/folder-data-source";

export class FolderRepositoryImpl implements FolderRepository {
  constructor(private readonly dataSource: FolderDataSource) {}
  findFolderById(id: number): Promise<Folder> {
    throw new Error("Method not implemented.");
  }
  findFoldersByOwner(owner: number): Promise<Folder[]> {
    throw new Error("Method not implemented.");
  }

  async getFolders(): Promise<Folder[]> {
    return this.dataSource.getFolders();
  }

  async createFolder(folder: Folder): Promise<boolean> {
    return this.dataSource.createFolder(
      folder.name,
      folder.owner,
      folder.parentFolder
    );
  }

  async renameFolder(id: number, name: string): Promise<boolean> {
    return this.dataSource.renameFolder(id, name);
  }

  async moveFolder(id: number, parentFolder: number): Promise<boolean> {
    return this.dataSource.moveFolder(id, parentFolder);
  }

  async deleteFolder(id: number): Promise<boolean> {
    return this.dataSource.deleteFolder(id);
  }
}
