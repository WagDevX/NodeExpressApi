import { File } from "../../domain/entities/file";
import { FileRepository } from "../../domain/repos/file-repository";
import { FileDataSource } from "../datasources/interface/file-data-source";

export class FileRepositoryImpl implements FileRepository {
    constructor(private readonly fileDataSource: FileDataSource) {}
    deleteFile(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    createFile(file: File): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    moveFile(id: number, parentFolder: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    renameFile(id: number, name: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    findFileByFolder(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}