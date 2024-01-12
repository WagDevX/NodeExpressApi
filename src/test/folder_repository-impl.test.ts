import { FolderDataSource } from "../folder/data/datasources/interfaces/folder-data-source";
import { FolderRepositoryImpl } from "../folder/data/repos/folder-repository-impl";
import { Folder } from "../folder/domain/entities/folder";
import { FolderRepository } from "../folder/domain/repos/folder-repository";

class MockFolderDataSource implements FolderDataSource {
  getFolders(): Promise<Folder[]> {
    throw new Error("Method not implemented.");
  }
  findFolderById(id: number): Promise<Folder> {
    throw new Error("Method not implemented.");
  }
  findFoldersByOwner(owner: number): Promise<Folder[]> {
    throw new Error("Method not implemented.");
  }
  createFolder(folder: Folder): Promise<void> {
    throw new Error("Method not implemented.");
  }
  renameFolder(id: number, name: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  moveFolder(id: number, parentFolder: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteFolder(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

describe("FolderRepositoryImpl", () => {
  let mockFolderDataSource: FolderDataSource;
  let folderRepository: FolderRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFolderDataSource = new MockFolderDataSource();
    folderRepository = new FolderRepositoryImpl(mockFolderDataSource);
  });

  describe("getFolders", () => {
    test("should call getFolders from dataSource", async () => {
      const expectedData = [
        { id: 1, name: "folder1", owner: 1, parentFolder: undefined },
      ];
      jest
        .spyOn(mockFolderDataSource, "getFolders")
        .mockImplementation(() => Promise.resolve(expectedData));
      const result = await folderRepository.getFolders();
      expect(result).toBe(expectedData);
    });
  });

  describe("findFolderById", () => {
    test("should call findFolderById from dataSource", async () => {
      const expectedData = {
        id: 1,
        name: "folder1",
        owner: 1,
        parentFolder: undefined,
      };
      jest
        .spyOn(mockFolderDataSource, "findFolderById")
        .mockImplementation(() => Promise.resolve(expectedData));
      const result = await folderRepository.findFolderById(1);
      expect(result).toBe(expectedData);
    });
  });

  describe("findFoldersByOwner", () => {
    test("should call findFoldersByOwner from dataSource", async () => {
      const expectedData = [
        { id: 1, name: "folder1", owner: 1, parentFolder: undefined },
      ];
      jest
        .spyOn(mockFolderDataSource, "findFoldersByOwner")
        .mockImplementation(() => Promise.resolve(expectedData));
      const result = await folderRepository.findFoldersByOwner(1);
      expect(result).toBe(expectedData);
    });
  });

  describe("createFolder", () => {
    test("should call createFolder from dataSource", async () => {
      jest
        .spyOn(mockFolderDataSource, "createFolder")
        .mockImplementation(() => Promise.resolve());
      const result = await folderRepository.createFolder({
        id: 1,
        name: "folder1",
        owner: 1,
        parentFolder: undefined,
      });
      expect(result).resolves;
    });
  });

  describe("renameFolder", () => {
    test("should call renameFolder from dataSource", async () => {
      jest
        .spyOn(mockFolderDataSource, "renameFolder")
        .mockImplementation(() => Promise.resolve());
      const result = await folderRepository.renameFolder(1, "folder1");
      expect(result).resolves;
    });
  });

  describe("moveFolder", () => {
    test("should call moveFolder from dataSource", async () => {
      jest
        .spyOn(mockFolderDataSource, "moveFolder")
        .mockImplementation(() => Promise.resolve());
      const result = await folderRepository.moveFolder(1, 1);
      expect(result).resolves;
    });
  });

  describe("deleteFolder", () => {
    test("should call deleteFolder from dataSource", async () => {
      const expectedData = true;
      jest
        .spyOn(mockFolderDataSource, "deleteFolder")
        .mockImplementation(() => Promise.resolve());
      const result = await folderRepository.deleteFolder(1);
      expect(result).resolves;
    });
  });
});
