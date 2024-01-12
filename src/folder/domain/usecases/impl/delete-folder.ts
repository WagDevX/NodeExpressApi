import { FolderRepository } from "../../repos/folder-repository";
import { DeleteFolderUseCase } from "../interfaces/delete-folder";

export class DeleteFolder implements DeleteFolderUseCase {
  constructor(private readonly repository: FolderRepository) {}

  async execute(id: number): Promise<boolean> {
    return await this.repository.deleteFolder(id);
  }
}
