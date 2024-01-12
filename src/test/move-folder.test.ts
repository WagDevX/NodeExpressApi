import { FolderRepository } from "../folder/domain/repos/folder-repository";
import { MockFolderRepository } from "./create-folder.test";

describe("MoveFolderUseCase", () => {
  let mockFolderRepository: FolderRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFolderRepository = new MockFolderRepository();
  });

  test("should return true if folder is moved", async () => {
    const id = 1;
    const parentFolder = 1;

    jest
      .spyOn(mockFolderRepository, "moveFolder")
      .mockImplementation(async () => true);

    const result = await mockFolderRepository.moveFolder(id, parentFolder);

    expect(result).toBeTruthy();
  });
});
