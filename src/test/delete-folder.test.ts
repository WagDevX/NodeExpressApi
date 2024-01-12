import { FolderRepository } from "../folder/domain/repos/folder-repository";
import { MockFolderRepository } from "./create-folder.test";

describe("DeleteFolderUseCase", () => {
  let mockFolderRepository: FolderRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFolderRepository = new MockFolderRepository();
  });

  test("should return true if folder is deleted", async () => {
    const id = 1;

    jest
      .spyOn(mockFolderRepository, "deleteFolder")
      .mockImplementation(async () => true);

    const result = await mockFolderRepository.deleteFolder(id);

    expect(result).toBeTruthy();
  });
});
