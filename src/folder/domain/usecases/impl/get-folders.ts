import { Folder } from "../../entities/folder";
import { FoldersResponse } from "../../entities/folders-response";
import { FolderRepository } from "../../repos/folder-repository";
import { GetFoldersUseCase } from "../interfaces/get-folders";

export class GetFolders implements GetFoldersUseCase {
  constructor(private readonly folderRepository: FolderRepository) {}

  async execute(): Promise<FoldersResponse[]> {
    return await this.folderRepository.getFolders();
  }
}
