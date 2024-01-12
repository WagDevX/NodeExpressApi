import { Folder } from "../../entities/folder";

export interface FindFolderByIdUseCase {
  execute(id: number): Promise<Folder>;
}
