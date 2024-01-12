import { FileRepository } from "../../repos/file-repository";
import { FindFileByFolderUseCase } from "../interfaces/find-file-by-folder";

export class FindFileByFolder implements FindFileByFolderUseCase {
    constructor(private readonly repository: FileRepository) {}
    async execute(id: number): Promise<boolean> {
        return await this.repository.findFileByFolder(id);
    }
}