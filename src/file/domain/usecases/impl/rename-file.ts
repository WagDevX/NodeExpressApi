import { FileRepository } from "../../repos/file-repository";
import { RenameFileUseCase } from "../interfaces/rename-file";

export class RenameFile implements RenameFileUseCase {
    constructor(private readonly repository: FileRepository) {}
    async execute(id: number, name: string): Promise<boolean> {
        return await this.repository.renameFile(id, name);
    }
}