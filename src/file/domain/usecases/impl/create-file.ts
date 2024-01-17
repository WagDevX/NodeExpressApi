import { File } from "../../entities/file";
import { FileRepository } from "../../repos/file-repository";
import { CreateFileUseCase } from "../interfaces/create-file";

export class CreateFile implements CreateFileUseCase {
  constructor(private readonly repository: FileRepository) {}
  async execute(file: File): Promise<File> {
    return await this.repository.createFile(file);
  }
}
