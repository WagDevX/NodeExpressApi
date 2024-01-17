import { File } from "../../domain/entities/file";
import { FileRepository } from "../../domain/repos/file-repository";
import { FileDataSource } from "../datasources/interface/file-data-source";

export class FileRepositoryImpl implements FileRepository {
  constructor(private readonly fileDataSource: FileDataSource) {}
  async deleteFile(id: number): Promise<boolean> {
    await this.fileDataSource.deleteFile(id);
    return true;
  }

  async createFile(file: File): Promise<boolean> {
    await this.fileDataSource.createFile(file);
    return true;
  }
  async moveFile(id: number, parentFolder: number): Promise<boolean> {
    await this.fileDataSource.moveFile(id, parentFolder);
    return true;
  }
  async renameFile(id: number, name: string): Promise<boolean> {
    await this.fileDataSource.renameFile(id, name);
    return true;
  }
  async findFileByFolder(id: number, owner: number): Promise<File[]> {
    const result = await this.fileDataSource.findFileByFolder(id, owner);
    return result;
  }
}
