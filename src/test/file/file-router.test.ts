import { File } from "../../file/domain/entities/file";
import { CreateFileUseCase } from "../../file/domain/usecases/interfaces/create-file";
import { DeleteFileUseCase } from "../../file/domain/usecases/interfaces/delete-file";
import { FindFileByFolderUseCase } from "../../file/domain/usecases/interfaces/find-file-by-folder";
import { MoveFileUseCase } from "../../file/domain/usecases/interfaces/move-file";
import { RenameFileUseCase } from "../../file/domain/usecases/interfaces/rename-file";
import FileRouter from "../../file/presentation/routers/file-router";
import mockserver from "../mock-server";
import { VerifyPermissionsMiddleware } from "../../core/middleware/interface/verify-permission";
import supertest from "supertest";
import mockVerifyPermissionsMiddleware from "../mock-verify-permissions";

class MockCreateFileUseCase implements CreateFileUseCase {
  execute(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

class MockMoveFileUseCase implements MoveFileUseCase {
  execute(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

class MockDeleteFileUseCase implements DeleteFileUseCase {
  execute(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

class MockRenameFileUseCase implements RenameFileUseCase {
  execute(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

class MockFindFileByFolderUseCase implements FindFileByFolderUseCase {
  execute(id: number): Promise<File> {
    throw new Error("Method not implemented.");
  }
}

describe("FileRouter", () => {
  let mockCreateFileUseCase: CreateFileUseCase;
  let mockMoveFileUseCase: MoveFileUseCase;
  let mockRenameFileUseCase: RenameFileUseCase;
  let mockDeleteFileUseCase: DeleteFileUseCase;
  let mockFindFileByFolderUseCase: FindFileByFolderUseCase;
  let mockVerifyPermissions: VerifyPermissionsMiddleware;

  beforeAll(() => {
    mockCreateFileUseCase = new MockCreateFileUseCase();
    mockMoveFileUseCase = new MockMoveFileUseCase();
    mockRenameFileUseCase = new MockRenameFileUseCase();
    mockDeleteFileUseCase = new MockDeleteFileUseCase();
    mockFindFileByFolderUseCase = new MockFindFileByFolderUseCase();
    mockVerifyPermissions = mockVerifyPermissionsMiddleware;

    mockserver.use(
      "/file",
      FileRouter(
        mockCreateFileUseCase,
        mockMoveFileUseCase,
        mockRenameFileUseCase,
        mockDeleteFileUseCase,
        mockFindFileByFolderUseCase,
        mockVerifyPermissions
      )
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /:id", () => {
    test("should return 200 with data", async () => {
      const expectedData: File = {
        fileName: "test",
        downloadUrl: "test",
        owner: 0,
        extension: ".test",
        size: 0,
      };
      jest
        .spyOn(mockFindFileByFolderUseCase, "execute")
        .mockImplementation(() => Promise.resolve(expectedData));

      const response = await supertest(mockserver).get("/file/0");
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual(expectedData);
    });

    test("should return 500 with error message", async () => {
      jest
        .spyOn(mockFindFileByFolderUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await supertest(mockserver).get("/file/0");
      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual({ message: "Error fetching file" });
    });
  });

  describe("POST /", () => {
    test("should return 201 with message", async () => {
      jest
        .spyOn(mockCreateFileUseCase, "execute")
        .mockImplementation(() => Promise.resolve(true));

      const response = await supertest(mockserver).post("/file");
      expect(response.status).toBe(201);
      expect(response.body).toStrictEqual({ message: "Created" });
    });

    test("should return 500 with error message", async () => {
      jest
        .spyOn(mockCreateFileUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await supertest(mockserver).post("/file");
      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual({ message: "Error creating file" });
    });
  });

  describe("PUT /rename/:id", () => {
    test("should return 201 with message", async () => {
      jest
        .spyOn(mockRenameFileUseCase, "execute")
        .mockImplementation(() => Promise.resolve(true));

      const response = await supertest(mockserver).put("/file/rename/0");
      expect(response.status).toBe(201);
      expect(response.body).toStrictEqual({ message: "Renamed" });
    });

    test("should return 500 with error message", async () => {
      jest
        .spyOn(mockRenameFileUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await supertest(mockserver).put("/file/rename/0");
      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual({ message: "Error renaming file" });
    });
  });

  describe("PUT /move/:id", () => {
    test("should return 201 with message", async () => {
      jest
        .spyOn(mockMoveFileUseCase, "execute")
        .mockImplementation(() => Promise.resolve(true));

      const response = await supertest(mockserver).put("/file/move/0");
      expect(response.status).toBe(201);
      expect(response.body).toStrictEqual({ message: "Moved" });
    });

    test("should return 500 with error message", async () => {
      jest
        .spyOn(mockMoveFileUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await supertest(mockserver).put("/file/move/0");
      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual({ message: "Error moving file" });
    });
  });

  describe("DELETE /:id", () => {
    test("should return 201 with message", async () => {
      jest
        .spyOn(mockDeleteFileUseCase, "execute")
        .mockImplementation(() => Promise.resolve(true));

      const response = await supertest(mockserver).delete("/file/0");
      expect(response.status).toBe(201);
      expect(response.body).toStrictEqual({ message: "Deleted" });
    });

    test("should return 500 with error message", async () => {
      jest
        .spyOn(mockDeleteFileUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await supertest(mockserver).delete("/file/0");
      expect(response.status).toBe(500);
      expect(response.body).toStrictEqual({ message: "Error deleting file" });
    });
  });
});
