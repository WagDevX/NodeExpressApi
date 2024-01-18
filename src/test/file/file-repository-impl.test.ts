import { FileDataSource } from "../../file/data/datasources/interface/file-data-source";
import { FileRepositoryImpl } from "../../file/data/repos/file-repository-impl";
import { File } from "../../file/domain/entities/file";
import { FileRepository } from "../../file/domain/repos/file-repository";

class MockFileDataSource implements FileDataSource {
  deleteFile(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  createFile(file: File): Promise<File> {
    throw new Error("Method not implemented.");
  }
  moveFile(id: number, parentFolder: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  renameFile(id: number, name: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findFileByFolder(id: number): Promise<File[]> {
    throw new Error("Method not implemented.");
  }
}

describe("FileRepositoryImpl", () => {
  let mockDataSource: FileDataSource;
  let fileRepository: FileRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockDataSource = new MockFileDataSource();
    fileRepository = new FileRepositoryImpl(mockDataSource);
  });

  const fakeFile: File = {
    id: 1,
    fileName: "file1",
    owner: 1,
    ownerName: "teste",
    downloadUrl: "http://www.google.com",
    parentFolder: undefined,
    extension: ".txt",
    size: 100,
  };

  describe("createFile", () => {
    test("should call createFile from dataSource", async () => {
      jest
        .spyOn(mockDataSource, "createFile")
        .mockImplementation(() => Promise.resolve(fakeFile));
      const result = await fileRepository.createFile(fakeFile);
      expect(result).resolves;
    });
  });

  describe("moveFile", () => {
    test("should call moveFile from dataSource", async () => {
      jest
        .spyOn(mockDataSource, "moveFile")
        .mockImplementation(() => Promise.resolve());
      const result = await fileRepository.moveFile(fakeFile.id!, 1);
      expect(result).resolves;
    });
  });

  describe("renameFile", () => {
    test("should call renameFile from dataSource", async () => {
      jest
        .spyOn(mockDataSource, "renameFile")
        .mockImplementation(() => Promise.resolve());
      const result = await fileRepository.renameFile(fakeFile.id!, "newName");
      expect(result).resolves;
    });
  });

  describe("findFileByFolder", () => {
    test("should call findFileByFolder from dataSource", async () => {
      jest
        .spyOn(mockDataSource, "findFileByFolder")
        .mockImplementation(() => Promise.resolve([fakeFile]));
      const result = await fileRepository.findFileByFolder(
        fakeFile.id!,
        fakeFile.owner
      );
      expect(result).toStrictEqual([fakeFile]);
    });
  });

  describe("deleteFile", () => {
    test("should call deleteFile from dataSource", async () => {
      jest
        .spyOn(mockDataSource, "deleteFile")
        .mockImplementation(() => Promise.resolve());
      const result = await fileRepository.deleteFile(fakeFile.id!);
      expect(result).resolves;
    });
  });
});
