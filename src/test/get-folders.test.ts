import { FolderRepository } from "../folder/domain/repos/folder-repository";
import { MockFolderRepository } from "./create-folder.test";

describe("GetFoldersUseCase", () => {
  let mockFolderRepository: FolderRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFolderRepository = new MockFolderRepository();
  });

  test("should return list of folders", async () => {
    const expetedData = [
      { name: "Folder 1", owner: 1, parentFolder: undefined },
    ];

    jest
      .spyOn(mockFolderRepository, "getFolders")
      .mockImplementation(async () => expetedData);

    const result = await mockFolderRepository.getFolders();

    expect(result).toStrictEqual(expetedData);
  });
});
