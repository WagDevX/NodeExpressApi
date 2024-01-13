import { FileRepository } from "../../repos/file-repository";
import { DeleteFileUseCase } from "../interfaces/delete-file";

export class DeleteFile implements DeleteFileUseCase {
    constructor(private readonly repository : FileRepository) {}
    async execute(id: number): Promise<boolean> {
        return await this.repository.deleteFile(id);
    }
}