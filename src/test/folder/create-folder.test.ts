import { Folder } from "../../folder/domain/entities/folder";
import { FolderRepository } from "../../folder/domain/repos/folder-repository";

export class MockFolderRepository implements FolderRepository {
  findFolderById(id: number): Promise<Folder> {
    throw new Error("Method not implemented.");
  }
  getFolders(): Promise<Folder[]> {
    throw new Error("Method not implemented.");
  }
  findFoldersByOwner(owner: number): Promise<Folder[]> {
    throw new Error("Method not implemented.");
  }
  moveFolder(id: number, parentFolder: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  renameFolder(id: number, name: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteFolder(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async createFolder(folder: Folder): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

describe("CreateFolderUseCase", () => {
  let mockFolderRepository: FolderRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFolderRepository = new MockFolderRepository();
  });

  test("should return true if folder is created", async () => {
    const folder: Folder = {
      id: 1,
      name: "Folder 1",
      owner: 1,
      parentFolder: undefined,
    };

    jest
      .spyOn(mockFolderRepository, "createFolder")
      .mockImplementation(async () => true);

    const result = await mockFolderRepository.createFolder(folder);

    expect(result).toBeTruthy();
  });
});
