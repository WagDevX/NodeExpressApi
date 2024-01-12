import request from "supertest";
import { Folder } from "../../../../src/folder/domain/entities/folder";
import { CreateFolderUseCase } from "../../domain/usecases/interfaces/create-folder";
import { DeleteFolderUseCase } from "../../domain/usecases/interfaces/delete-folder";
import { GetFoldersUseCase } from "../../domain/usecases/interfaces/get-folders";
import { MoveFolderUseCase } from "../../domain/usecases/interfaces/move-folder";
import { RenameFolderUseCase } from "../../domain/usecases/interfaces/rename-folder";
import FoldersRouter from "../../../../src/folder/presentation/routers/folder-router";
import server from "../../../../src/server";

class MockGetFoldersUseCase implements GetFoldersUseCase {
  execute(): Promise<Folder[]> {
    throw new Error("Method not implemented.");
  }
}

class MockCreateFolderUseCase implements CreateFolderUseCase {
  execute(folder: Folder): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

class MockRenameFolderUseCase implements RenameFolderUseCase {
  execute(id: number, name: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

class MockDeleteFolderUseCase implements DeleteFolderUseCase {
  execute(id: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

class MockMoveFolderUseCase implements MoveFolderUseCase {
  execute(id: number, parentFolder: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

describe("FolderRouter", () => {
  let mockCreateFolderUseCase: CreateFolderUseCase;
  let mockGetFoldersUseCase: GetFoldersUseCase;
  let mockrenameFolderUseCase: RenameFolderUseCase;
  let mockdeleteFolderUseCase: DeleteFolderUseCase;
  let mockmoveFolderUseCase: MoveFolderUseCase;

  beforeAll(() => {
    mockCreateFolderUseCase = new MockCreateFolderUseCase();
    mockGetFoldersUseCase = new MockGetFoldersUseCase();
    mockrenameFolderUseCase = new MockRenameFolderUseCase();
    mockdeleteFolderUseCase = new MockDeleteFolderUseCase();
    mockmoveFolderUseCase = new MockMoveFolderUseCase();

    server.use(
      "/folder",
      FoldersRouter(
        mockGetFoldersUseCase,
        mockCreateFolderUseCase,
        mockmoveFolderUseCase,
        mockrenameFolderUseCase,
        mockdeleteFolderUseCase
      )
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /folder", () => {
    test("should return 200 with data", async () => {
      const ExpectedData = [{ id: 1, name: "Folder 1", owner: 1 }];
      jest
        .spyOn(mockGetFoldersUseCase, "execute")
        .mockImplementation(() => Promise.resolve(ExpectedData));
      const response = await request(server).get("/folder");
      expect(response.status).toBe(200);
      expect(mockGetFoldersUseCase.execute).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(ExpectedData);
    });

    test("GET /folder returns 500 on use case error", async () => {
      const ExpectedData = [{ id: 1, name: "Folder 1", owner: 1 }];
      jest
        .spyOn(mockGetFoldersUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));
      const response = await request(server).get("/folder");
      expect(response.status).toBe(500);
      expect(mockGetFoldersUseCase.execute).toBeCalledTimes(1);
      expect(response.body).toStrictEqual({
        message: "Error fetching folders",
      });
    });
  });

  describe("POST /folder", () => {
    test("should return 204 with created", async () => {
      const expectedData = { message: "Created" };
      const inputData = { name: "Folder 1", owner: 1 };
      jest
        .spyOn(mockCreateFolderUseCase, "execute")
        .mockImplementation(() => Promise.resolve(true));

      const response = await request(server).post("/folder").send(inputData);

      expect(response.status).toBe(201);
      expect(mockCreateFolderUseCase.execute).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(expectedData);
    });

    test("should returns 500 on case error", async () => {
      const inputData = { name: "Folder 1", owner: 1 };
      jest
        .spyOn(mockCreateFolderUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server).post("/folder").send(inputData);

      expect(response.status).toBe(500);
      expect(mockCreateFolderUseCase.execute).toBeCalledTimes(1);
    });
  });

  describe("DELETE /folder/:id", () => {
    test("should return 201 with deleted message", async () => {
      const expectedData = { message: "Deleted" };
      jest
        .spyOn(mockdeleteFolderUseCase, "execute")
        .mockImplementation(() => Promise.resolve(true));

      const response = await request(server).delete("/folder/1");

      expect(response.status).toBe(201);
      expect(mockdeleteFolderUseCase.execute).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(expectedData);
    });

    test("should returns 500 on case error", async () => {
      jest
        .spyOn(mockdeleteFolderUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server).delete("/folder/1");

      expect(response.status).toBe(500);
      expect(mockdeleteFolderUseCase.execute).toBeCalledTimes(1);
    });
  });

  describe("PUT /folder/:id", () => {
    test("should return 201 with updated message", async () => {
      const expectedData = { message: "Updated" };
      jest
        .spyOn(mockrenameFolderUseCase, "execute")
        .mockImplementation(() => Promise.resolve(true));

      const response = await request(server)
        .put("/folder/1")
        .send({ name: "Folder 1" });

      expect(response.status).toBe(201);
      expect(mockrenameFolderUseCase.execute).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(expectedData);
    });

    test("should returns 500 on case error", async () => {
      jest
        .spyOn(mockrenameFolderUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server)
        .put("/folder/1")
        .send({ name: "Folder 1" });

      expect(response.status).toBe(500);
      expect(mockrenameFolderUseCase.execute).toBeCalledTimes(1);
    });
  });

  describe("PUT /folder/:id/move", () => {
    test("should return 201 with moved message", async () => {
      const expectedData = { message: "Moved" };
      jest
        .spyOn(mockmoveFolderUseCase, "execute")
        .mockImplementation(() => Promise.resolve(true));

      const response = await request(server)
        .put("/folder/1/move")
        .send({ parentFolder: 1 });

      expect(response.status).toBe(201);
      expect(mockmoveFolderUseCase.execute).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(expectedData);
    });

    test("should returns 500 on case error", async () => {
      jest
        .spyOn(mockmoveFolderUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(server)
        .put("/folder/1/move")
        .send({ parentFolder: 1 });

      expect(response.status).toBe(500);
      expect(mockmoveFolderUseCase.execute).toBeCalledTimes(1);
    });
  });
});
