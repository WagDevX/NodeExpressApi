import { File } from "../entities/file";

export interface FileRepository {
    createFile(file: File) : Promise<boolean>;

    moveFile(id: number, parentFolder : number) : Promise<boolean>;

    renameFile(id: number, name: string) : Promise<boolean>;

    findFileByFolder(id: number) : Promise<boolean>;

    deleteFile(id: number) : Promise<boolean>;
}