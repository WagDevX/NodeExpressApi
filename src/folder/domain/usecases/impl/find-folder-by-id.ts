import { Folder } from "../../entities/folder";
import { FolderRepository } from "../../repos/folder-repository";
import { FindFolderByIdUseCase } from "../interfaces/find-folder-by-id";

export class FindFolderById implements FindFolderByIdUseCase {
  constructor(private readonly repository: FolderRepository) {}
  async execute(id: number): Promise<Folder> {
    return await this.repository.findFolderById(id);
  }
}
