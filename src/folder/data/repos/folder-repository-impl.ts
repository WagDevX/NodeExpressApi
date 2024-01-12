import { Folder } from "../../domain/entities/folder";
import { FolderRepository } from "../../domain/repos/folder-repository";
import { FolderDataSource } from "../datasources/interfaces/folder-data-source";

export class FolderRepositoryImpl implements FolderRepository {
  dataSource: FolderDataSource;
  constructor(dataSource: FolderDataSource) {
    this.dataSource = dataSource;
  }
  async findFolderById(id: number): Promise<Folder> {
    const response = await this.dataSource.findFolderById(id);
    return response;
  }

  async findFoldersByOwner(owner: number): Promise<Folder[]> {
    const response = await this.dataSource.findFoldersByOwner(owner);
    return response;
  }

  async getFolders(): Promise<Folder[]> {
    const response = await this.dataSource.getFolders();
    return response;
  }

  async createFolder(folder: Folder): Promise<boolean> {
    await this.dataSource.createFolder(folder);
    return true;
  }

  async renameFolder(id: number, name: string): Promise<boolean> {
    await this.dataSource.renameFolder(id, name);
    return true;
  }

  async moveFolder(id: number, parentFolder: number): Promise<boolean> {
    await this.dataSource.moveFolder(id, parentFolder);
    return true;
  }

  async deleteFolder(id: number): Promise<boolean> {
    await this.dataSource.deleteFolder(id);
    return true;
  }
}
