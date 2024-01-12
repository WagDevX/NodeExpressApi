import { FileRepository } from "../file/domain/repos/file-repository";
import { MockFileRepository } from "./create-file.test";

describe("RenameFileUseCase", () => {
    let  mockFolderRepository : FileRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        mockFolderRepository = new MockFileRepository();
    });

    test("should return true if file is renamed", async () => {
        const id = 1;
        const name = "File 1";

        jest.spyOn(mockFolderRepository, "renameFile").mockImplementation(async () => true);

        const result = await mockFolderRepository.renameFile(id, name);

        expect(result).toBeTruthy();
    });
});