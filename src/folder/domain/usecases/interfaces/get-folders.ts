import { Folder } from "../../entities/folder";

export interface GetFoldersUseCase {
  execute(): Promise<Folder[]>;
}
