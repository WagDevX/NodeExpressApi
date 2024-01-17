import { Folder } from "../../entities/folder";
import { FolderRepository } from "../../repos/folder-repository";
import { CreateFolderUseCase } from "../interfaces/create-folder";

export class CreateFolder implements CreateFolderUseCase {
  constructor(private readonly folderRepository: FolderRepository) {}

  async execute(folder: Folder): Promise<Folder> {
    return await this.folderRepository.createFolder(folder);
  }
}
