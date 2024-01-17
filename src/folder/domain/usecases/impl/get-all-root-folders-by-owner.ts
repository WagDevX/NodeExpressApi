import { FoldersResponse } from "../../entities/folders-response";
import { FolderRepository } from "../../repos/folder-repository";
import { GetAllRootFoldersByOwnerUseCase } from "../interfaces/get-all-root-folders-by-owner";

export class GetAllRootFoldersByOwner
  implements GetAllRootFoldersByOwnerUseCase
{
  constructor(private readonly repository: FolderRepository) {}
  async execute(owner: number): Promise<FoldersResponse[]> {
    return await this.repository.getAllRootFoldersByOwner(owner);
  }
}
