import { FileRepository } from "../../file/domain/repos/file-repository";
import { MockFileRepository } from "./create-file.test";

describe("MoveFileUseCase", () => {
  let mockFolderRepository: FileRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFolderRepository = new MockFileRepository();
  });

  test("should return true if file is moved", async () => {
    const id = 1;
    const parentFolder = 1;

    jest
      .spyOn(mockFolderRepository, "moveFile")
      .mockImplementation(async () => true);

    const result = await mockFolderRepository.moveFile(id, parentFolder);

    expect(result).toBeTruthy();
  });
});
