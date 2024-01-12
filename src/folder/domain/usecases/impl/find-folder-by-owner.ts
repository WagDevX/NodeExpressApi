import { Folder } from "../../entities/folder";
import { FolderRepository } from "../../repos/folder-repository";
import { FindFolderByOwnerUseCase } from "../interfaces/find-folder-by-owner";

export class FindFolderByOwner implements FindFolderByOwnerUseCase {
  constructor(private readonly repository: FolderRepository) {}
  async execute(owner: number): Promise<Folder[]> {
    return await this.repository.findFoldersByOwner(owner);
  }
}
