import { FolderRepository } from "../../repos/folder-repository";
import { MockFolderRepository } from "./create-folder.test";

describe("RenameFolderUseCase", () => {
  let mockFolderRepository: FolderRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFolderRepository = new MockFolderRepository();
  });

  test("should return true if folder is renamed", async () => {
    const id = 1;
    const name = "Folder 1";

    jest
      .spyOn(mockFolderRepository, "renameFolder")
      .mockImplementation(async () => true);

    const result = await mockFolderRepository.renameFolder(id, name);

    expect(result).toBeTruthy();
  });
});
