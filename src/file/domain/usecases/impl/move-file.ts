import { FileRepository } from "../../repos/file-repository";
import { MoveFileUseCase } from "../interfaces/move-file";

export class MoveFile implements MoveFileUseCase {
    constructor(private readonly repository: FileRepository) {}
    async execute(id: number, parentFolder: number): Promise<boolean> {
        return await this.repository.moveFile(id, parentFolder);
    }
}