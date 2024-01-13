import { File } from "../file/domain/entities/file";
import { FileRepository } from "../file/domain/repos/file-repository";

export class MockFileRepository implements FileRepository {
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

describe("CreateFileUseCase", () => {
    let mockFolderRepository : FileRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        mockFolderRepository = new MockFileRepository();
    });

    test("should return true if file is created", async () => {
        const file: File = {
            id: 1,
            fileName: "File 1",
            owner: 1,
            downloadUrl: "http://localhost:3000/file/1",
            parentFolder: undefined,
            extension: "txt",
            size: 100
        };

        jest.spyOn(mockFolderRepository, "createFile").mockImplementation(async () => true);

        const result = await mockFolderRepository.createFile(file);

        expect(result).toBeTruthy();
    });
});