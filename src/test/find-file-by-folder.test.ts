import { FileRepository } from "../file/domain/repos/file-repository";
import { MockFileRepository } from "./create-file.test";

describe("findFileByFolder", () => {
    let mockFolderRepository : FileRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        mockFolderRepository = new MockFileRepository();
    });

    test("should return a file if succeeds", async () => {
        const id = 1;

        jest.spyOn(mockFolderRepository, "findFileByFolder").mockImplementation(async () => true);

        const result = await mockFolderRepository.findFileByFolder(id);

        expect(result).toBeTruthy();
    });
});