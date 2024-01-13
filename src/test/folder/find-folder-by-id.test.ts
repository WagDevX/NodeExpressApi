import { FolderRepository } from "../../folder/domain/repos/folder-repository";
import { MockFolderRepository } from "./create-folder.test";

describe("FindFolderByIdUseCase", () => {
  let mockFolderRepository: FolderRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFolderRepository = new MockFolderRepository();
  });

  test("should return folder if folder exists", async () => {
    const folderId = 1;

    jest
      .spyOn(mockFolderRepository, "findFolderById")
      .mockImplementation(async () => {
        const folder = {
          id: folderId,
          name: "Folder 1",
          owner: 1,
          parentFolder: undefined,
        };
        return folder;
      });

    const result = await mockFolderRepository.findFolderById(folderId);

    expect(result).toBeTruthy();
    expect(result.id).toEqual(folderId);
  });
});
