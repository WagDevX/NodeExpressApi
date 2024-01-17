import { FoldersResponse } from "../../entities/folders-response";

export interface GetAllRootFoldersByOwnerUseCase {
  execute(owner: number): Promise<FoldersResponse[]>;
}
