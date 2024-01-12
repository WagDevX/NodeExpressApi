import { File } from "../../../domain/entities/file";

export interface FileDataSource {
    createFile(file: File): Promise<void>;
    moveFile(id: number, parentFolder: number): Promise<void>;
    renameFile(id: number, name: string): Promise<void>;
    findFileByFolder(id: number): Promise<File>;
    deleteFile(id: number): Promise<void>;
}