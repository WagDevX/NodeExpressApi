import { FolderRepository } from "../../repos/folder-repository";
import { MoveFolderUseCase } from "../interfaces/move-folder";

export class MoveFolder implements MoveFolderUseCase {
  constructor(private readonly repository: FolderRepository) {}

  async execute(id: number, parentFolder: number): Promise<boolean> {
    return await this.repository.moveFolder(id, parentFolder);
  }
}
