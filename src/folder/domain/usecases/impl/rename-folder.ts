import { FolderRepository } from "../../repos/folder-repository";
import { RenameFolderUseCase } from "../interfaces/rename-folder";

export class RenameFolder implements RenameFolderUseCase {
  constructor(private readonly folderRepository: FolderRepository) {}

  async execute(id: number, name: string): Promise<boolean> {
    return await this.folderRepository.renameFolder(id, name);
  }
}
