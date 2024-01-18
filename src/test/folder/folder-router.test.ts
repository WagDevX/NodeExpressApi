import supertest from "supertest";
import { Folder } from "../../folder/domain/entities/folder";
import { CreateFolderUseCase } from "../../folder/domain/usecases/interfaces/create-folder";
import { DeleteFolderUseCase } from "../../folder/domain/usecases/interfaces/delete-folder";
import { FindFolderByIdUseCase } from "../../folder/domain/usecases/interfaces/find-folder-by-id";
import { FindFolderByOwnerUseCase } from "../../folder/domain/usecases/interfaces/find-folder-by-owner";
import { GetFoldersUseCase } from "../../folder/domain/usecases/interfaces/get-folders";
import { MoveFolderUseCase } from "../../folder/domain/usecases/interfaces/move-folder";
import { RenameFolderUseCase } from "../../folder/domain/usecases/interfaces/rename-folder";
import FoldersRouter from "../../folder/presentation/routers/folder-router";
import mockserver from "../mock-server";
import mockVerifyPermissionsMiddleware from "../mock-verify-permissions";
import { VerifyPermissionsMiddleware } from "../../core/middleware/interface/verify-permission";
import { FoldersResponse } from "../../folder/domain/entities/folders-response";

var request = require("supertest");

class MockGetFoldersUseCase implements GetFoldersUseCase {
  execute(): Promise<FoldersResponse[]> {
    throw new Error("Method not implemented.");
  }
}

class MockCreateFolderUseCase implements CreateFolderUseCase {
  execute(folder: Folder): Promise<Folder> {
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

class MockFindFolderByIdUseCase implements FindFolderByIdUseCase {
  execute(id: number): Promise<Folder> {
    throw new Error("Method not implemented.");
  }
}

class MockFindFolderByOwnerUseCase implements FindFolderByOwnerUseCase {
  execute(owner: number): Promise<Folder[]> {
    throw new Error("Method not implemented.");
  }
}

describe("FolderRouter", () => {
  let mockCreateFolderUseCase: CreateFolderUseCase;
  let mockGetFoldersUseCase: GetFoldersUseCase;
  let mockrenameFolderUseCase: RenameFolderUseCase;
  let mockdeleteFolderUseCase: DeleteFolderUseCase;
  let mockmoveFolderUseCase: MoveFolderUseCase;
  let mockFindFolderByIdUseCase: FindFolderByIdUseCase;
  let mockFindFolderByOwnerUseCase: FindFolderByOwnerUseCase;
  let mockVerifyPermissions: VerifyPermissionsMiddleware;

  beforeAll(() => {
    mockCreateFolderUseCase = new MockCreateFolderUseCase();
    mockGetFoldersUseCase = new MockGetFoldersUseCase();
    mockrenameFolderUseCase = new MockRenameFolderUseCase();
    mockdeleteFolderUseCase = new MockDeleteFolderUseCase();
    mockmoveFolderUseCase = new MockMoveFolderUseCase();
    mockFindFolderByIdUseCase = new MockFindFolderByIdUseCase();
    mockFindFolderByOwnerUseCase = new MockFindFolderByOwnerUseCase();
    mockVerifyPermissions = mockVerifyPermissionsMiddleware;

    mockserver.use(
      "/folder",
      FoldersRouter(
        mockGetFoldersUseCase,
        mockCreateFolderUseCase,
        mockmoveFolderUseCase,
        mockrenameFolderUseCase,
        mockdeleteFolderUseCase,
        mockFindFolderByIdUseCase,
        mockFindFolderByOwnerUseCase,
        mockVerifyPermissions
      )
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /folder", () => {
    test("should return 200 with data", async () => {
      const expectedData = [
        { id: 1, name: "Folder 1", owner: 1, ownerName: "Admin", children: [] },
      ];
      jest
        .spyOn(mockGetFoldersUseCase, "execute")
        .mockImplementation(() => Promise.resolve(expectedData));
      const response = await supertest(mockserver)
        .get("/folder/getall")
        .set(
          "x-access-token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE3MDUyMDQ2NzIsImV4cCI6MTcwNTI5MTA3Mn0.TyXzh9TC6QCwjaDHN-1QiYh8-0gYIVCbgnbVcH8PAQM"
        );

      expect(response.status).toBe(200);
      expect(mockGetFoldersUseCase.execute).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(expectedData);
    });

    test("GET /folder returns 500 on use case error", async () => {
      jest
        .spyOn(mockGetFoldersUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));
      const response = await request(mockserver)
        .get("/folder/getall")
        .set(
          "x-access-token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE3MDUyMDQ2NzIsImV4cCI6MTcwNTI5MTA3Mn0.TyXzh9TC6QCwjaDHN-1QiYh8-0gYIVCbgnbVcH8PAQM"
        );
      console.log(response);
      expect(response.status).toBe(500);
      expect(mockGetFoldersUseCase.execute).toBeCalledTimes(1);
      expect(response.body).toStrictEqual({
        message: "Error fetching folders",
      });
    });
  });

  describe("POST /folder", () => {
    test("should return 204 with created", async () => {
      const inputData = { name: "Folder 1", owner: 1, ownerName: "Admin" };
      jest
        .spyOn(mockCreateFolderUseCase, "execute")
        .mockImplementation(() => Promise.resolve(inputData));

      const response = await supertest(mockserver)
        .post("/folder")
        .set(
          "x-access-token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJpYXQiOjE3MDUyNDc4MzIsImV4cCI6MTcwNTMzNDIzMn0.2QO56gLXl99tblrXQBWvcOXCPKcSvz3EDLk33eDadyg"
        )
        .send(inputData);

      expect(response.status).toBe(201);
      expect(mockCreateFolderUseCase.execute).toBeCalledTimes(1);
    });

    test("should returns 500 on case error", async () => {
      const inputData = { name: "Folder 1", owner: 1, ownerName: "Admin" };
      jest
        .spyOn(mockCreateFolderUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await supertest(mockserver)
        .post("/folder")
        .set(
          "x-access-token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJpYXQiOjE3MDUyNDc4MzIsImV4cCI6MTcwNTMzNDIzMn0.2QO56gLXl99tblrXQBWvcOXCPKcSvz3EDLk33eDadyg"
        )
        .send(inputData);

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

      const response = await request(mockserver).delete("/folder/1");
      expect(response.status).toBe(201);
      expect(mockdeleteFolderUseCase.execute).toBeCalledTimes(1);
    });

    test("should returns 500 on case error", async () => {
      jest
        .spyOn(mockdeleteFolderUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(mockserver)
        .delete("/folder/1")
        .set(
          "x-access-token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJpYXQiOjE3MDUyNDc4MzIsImV4cCI6MTcwNTMzNDIzMn0.2QO56gLXl99tblrXQBWvcOXCPKcSvz3EDLk33eDadyg"
        );

      expect(response.status).toBe(500);
      expect(mockdeleteFolderUseCase.execute).toBeCalledTimes(1);
    });
  });

  describe("PUT /folder/rename/:id", () => {
    test("should return 201 with updated message", async () => {
      const expectedData = { message: "Updated" };
      jest
        .spyOn(mockrenameFolderUseCase, "execute")
        .mockImplementation(() => Promise.resolve(true));

      const response = await request(mockserver)
        .put("/folder/rename/1")
        .set(
          "x-access-token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJpYXQiOjE3MDUyNDc4MzIsImV4cCI6MTcwNTMzNDIzMn0.2QO56gLXl99tblrXQBWvcOXCPKcSvz3EDLk33eDadyg"
        )
        .send({ name: "Folder 1" });

      expect(response.status).toBe(201);
      expect(mockrenameFolderUseCase.execute).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(expectedData);
    });

    test("should returns 500 on case error", async () => {
      jest
        .spyOn(mockrenameFolderUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(mockserver)
        .put("/folder/rename/1")
        .set(
          "x-access-token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJpYXQiOjE3MDUyNDc4MzIsImV4cCI6MTcwNTMzNDIzMn0.2QO56gLXl99tblrXQBWvcOXCPKcSvz3EDLk33eDadyg"
        )
        .send({ name: "Folder 1" });

      expect(response.status).toBe(500);
      expect(mockrenameFolderUseCase.execute).toBeCalledTimes(1);
    });
  });

  describe("PUT /folder/move/:id", () => {
    test("should return 201 with moved message", async () => {
      const expectedData = { message: "Moved" };
      jest
        .spyOn(mockmoveFolderUseCase, "execute")
        .mockImplementation(() => Promise.resolve(true));

      const response = await request(mockserver)
        .put("/folder/move/1")
        .set(
          "x-access-token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJpYXQiOjE3MDUyNDc4MzIsImV4cCI6MTcwNTMzNDIzMn0.2QO56gLXl99tblrXQBWvcOXCPKcSvz3EDLk33eDadyg"
        )
        .send({ parentFolder: 1 });

      expect(response.status).toBe(201);
      expect(mockmoveFolderUseCase.execute).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(expectedData);
    });

    test("should returns 500 on case error", async () => {
      jest
        .spyOn(mockmoveFolderUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));

      const response = await request(mockserver)
        .put("/folder/move/1")
        .set(
          "x-access-token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJpYXQiOjE3MDUyNDc4MzIsImV4cCI6MTcwNTMzNDIzMn0.2QO56gLXl99tblrXQBWvcOXCPKcSvz3EDLk33eDadyg"
        )
        .send({ parentFolder: 1 });

      expect(response.status).toBe(500);
      expect(mockmoveFolderUseCase.execute).toBeCalledTimes(1);
    });
  });

  describe("GET /folder/:id", () => {
    test("should return 200 with data", async () => {
      const ExpectedData = {
        id: 1,
        name: "Folder 1",
        owner: 1,
        ownerName: "Admin",
      };
      jest
        .spyOn(mockFindFolderByIdUseCase, "execute")
        .mockImplementation(() => Promise.resolve(ExpectedData));
      const response = await supertest(mockserver)
        .get("/folder/1")
        .set(
          "x-access-token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJpYXQiOjE3MDUyNDc4MzIsImV4cCI6MTcwNTMzNDIzMn0.2QO56gLXl99tblrXQBWvcOXCPKcSvz3EDLk33eDadyg"
        );
      expect(response.status).toBe(200);
      expect(mockFindFolderByIdUseCase.execute).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(ExpectedData);
    });

    test("GET /folder/:id returns 500 on use case error", async () => {
      const ExpectedData = {
        id: 1,
        name: "Folder 1",
        owner: 1,
        ownerName: "Admin",
      };
      jest
        .spyOn(mockFindFolderByIdUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));
      const response = await supertest(mockserver)
        .get("/folder/1")
        .set(
          "x-access-token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJpYXQiOjE3MDUyNDc4MzIsImV4cCI6MTcwNTMzNDIzMn0.2QO56gLXl99tblrXQBWvcOXCPKcSvz3EDLk33eDadyg"
        );
      expect(response.status).toBe(500);
      expect(mockFindFolderByIdUseCase.execute).toBeCalledTimes(1);
      expect(response.body).toStrictEqual({
        message: "Error fetching folder",
      });
    });
  });

  describe("GET /folder/owner/:id", () => {
    test("should return 200 with data", async () => {
      const ExpectedData = [
        { id: 1, name: "Folder 1", owner: 1, ownerName: "Admin" },
      ];
      jest
        .spyOn(mockFindFolderByOwnerUseCase, "execute")
        .mockImplementation(() => Promise.resolve(ExpectedData));
      const response = await supertest(mockserver)
        .get("/folder/owner/1")
        .set(
          "x-access-token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJpYXQiOjE3MDUyNDc4MzIsImV4cCI6MTcwNTMzNDIzMn0.2QO56gLXl99tblrXQBWvcOXCPKcSvz3EDLk33eDadyg"
        );
      expect(response.status).toBe(200);
      expect(mockFindFolderByOwnerUseCase.execute).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(ExpectedData);
    });

    test("GET /folder/:id/owner returns 500 on use case error", async () => {
      const ExpectedData = [{ id: 1, name: "Folder 1", owner: 1 }];
      jest
        .spyOn(mockFindFolderByOwnerUseCase, "execute")
        .mockImplementation(() => Promise.reject(Error()));
      const response = await supertest(mockserver)
        .get("/folder/owner/1")
        .set(
          "x-access-token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJpYXQiOjE3MDUyNDc4MzIsImV4cCI6MTcwNTMzNDIzMn0.2QO56gLXl99tblrXQBWvcOXCPKcSvz3EDLk33eDadyg"
        );
      expect(response.status).toBe(500);
      expect(mockFindFolderByOwnerUseCase.execute).toBeCalledTimes(1);
      expect(response.body).toStrictEqual({
        message: "Error fetching folder",
      });
    });
  });
});
