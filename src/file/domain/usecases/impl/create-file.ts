import { File } from "../../entities/file";
import { FileRepository } from "../../repos/file-repository";
import { CreateFileUseCase } from "../interfaces/create-file";

export class CreateFile implements CreateFileUseCase {
  constructor(private readonly fileRepository: FileRepository) {}
    async execute(file: File): Promise<boolean> {
        return await this.fileRepository.createFile(file);
    }

}