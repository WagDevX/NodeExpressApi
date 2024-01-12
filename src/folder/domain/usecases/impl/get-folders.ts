import { Folder } from "../../entities/folder";
import { FolderRepository } from "../../repos/folder-repository";
import { GetFoldersUseCase } from "../interfaces/get-folders";

export class GetFolders implements GetFoldersUseCase {
  constructor(private readonly folderRepository: FolderRepository) {}

  async execute(): Promise<Folder[]> {
    return await this.folderRepository.getFolders();
  }
}
