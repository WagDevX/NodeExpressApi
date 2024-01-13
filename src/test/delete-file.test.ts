import { FileRepository } from "../file/domain/repos/file-repository";
import { MockFileRepository } from "./create-file.test";

describe("deleteFile", () => {
    let mockFileRepository: FileRepository;
    
    beforeEach(() => {
        jest.clearAllMocks();
        mockFileRepository = new MockFileRepository();
    });

    test("should call deleteFile from repository", async () => {
        jest.spyOn(mockFileRepository, "deleteFile").mockImplementation(() => Promise.resolve(true));
        const result = await mockFileRepository.deleteFile(1);
        expect(result).resolves;
    });
});