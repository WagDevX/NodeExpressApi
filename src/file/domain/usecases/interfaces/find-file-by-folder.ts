import { File } from "../../entities/file";

export interface FindFileByFolderUseCase {
  execute(id: number): Promise<File>;
}
