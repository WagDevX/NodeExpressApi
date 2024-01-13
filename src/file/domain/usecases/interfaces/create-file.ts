import { File } from "../../entities/file";

export interface CreateFileUseCase {
    execute(file: File) : Promise<boolean>
}