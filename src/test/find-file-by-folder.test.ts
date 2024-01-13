import { File } from "../file/domain/entities/file";
import { FileRepository } from "../file/domain/repos/file-repository";
import { MockFileRepository } from "./create-file.test";

describe("findFileByFolder", () => {
    let mockFolderRepository : FileRepository;

    const fakeFile : File = {
        id: 1,
        fileName: "File 1",
        owner: 1,
        downloadUrl: "http://localhost:3000/file/1",
        parentFolder: undefined,
        extension: "txt",
        size: 100
    };


    beforeEach(() => {
        jest.clearAllMocks();
        mockFolderRepository = new MockFileRepository();
    });

    test("should return a file if succeeds", async () => {
        const id = 1;

        jest.spyOn(mockFolderRepository, "findFileByFolder").mockImplementation(async () => Promise.resolve(fakeFile));

        const result = await mockFolderRepository.findFileByFolder(id);

        expect(result).toBeTruthy();
    });
});