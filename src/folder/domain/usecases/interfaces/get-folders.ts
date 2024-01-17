import { Folder } from "../../entities/folder";
import { FoldersResponse } from "../../entities/folders-response";

export interface GetFoldersUseCase {
  execute(): Promise<FoldersResponse[]>;
}
