import { Folder } from "../../entities/folder";

export interface CreateFolderUseCase {
  execute(folder: Folder): Promise<Folder>;
}
