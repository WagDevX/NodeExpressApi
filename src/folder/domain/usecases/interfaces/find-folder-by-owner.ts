import { Folder } from "../../entities/folder";

export interface FindFolderByOwnerUseCase {
  execute(owner: number): Promise<Folder[]>;
}
