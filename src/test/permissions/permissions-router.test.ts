import request from "supertest";
import { Permission } from "../../permissions/domain/entities/permission";
import { CreatePermissionUseCase } from "../../permissions/domain/usecases/interfaces/create-permission";
import { GetPermissionsUseCase } from "../../permissions/domain/usecases/interfaces/get-permissions";
import { UpdatePermissionUseCase } from "../../permissions/domain/usecases/interfaces/update-permission";
import PermissionsRouter from "../../permissions/presentation/routers/permissions-router";
import server from "../../server";

class MockCreatePermissionUseCase implements CreatePermissionUseCase {
    execute(permission: Permission): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}

class MockUpdatePermissionUseCase implements UpdatePermissionUseCase {
    execute(id: number, permission: Permission): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}

class MockGetPermissionsUseCase implements GetPermissionsUseCase {
    execute(): Promise<Permission[]> {
        throw new Error("Method not implemented.");
    }
}

describe("Permissions Router", () => {
    let mockCreatePermission : CreatePermissionUseCase;
    let mockUpdatePermission : UpdatePermissionUseCase;
    let mockGetPermissions : GetPermissionsUseCase;

    beforeAll(() => {
        mockCreatePermission = new MockCreatePermissionUseCase();
        mockUpdatePermission = new MockUpdatePermissionUseCase();
        mockGetPermissions = new MockGetPermissionsUseCase();

        server.use("/permissions", PermissionsRouter(
            mockCreatePermission,
            mockUpdatePermission,
            mockGetPermissions
        ));
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("POST /permissions", () => {
        test("should return 201 when permission is created", async () => {
            const expectedData = { message: "Created" };
            const inputData : Permission = {
                id: 0,
                userId: 0,
                folderId: 0,
                fileId: 0,
                canRead: false,
                canWrite: false,
                canDelete: false
            };
            jest.spyOn(mockCreatePermission, "execute").mockImplementationOnce(async () => Promise.resolve(true));

            const response = await request(server).post("/permissions").send(inputData);

            expect(response.status).toEqual(201);
            expect(response.body).toStrictEqual(expectedData);
        });
        
        test("should return 500 when permission is not created", async () => {
            const expectedData = { message: "Error creating permission" };
            const inputData : Permission = {
                id: 0,
                userId: 0,
                folderId: 0,
                fileId: 0,
                canRead: false,
                canWrite: false,
                canDelete: false
            };
            jest.spyOn(mockCreatePermission, "execute").mockImplementationOnce(async () => Promise.reject(Error()));

            const response = await request(server).post("/permissions").send(inputData);

            expect(response.status).toEqual(500);
            expect(response.body).toStrictEqual(expectedData);
        });
    });

    describe("PUT /permissions/:id", () => {
        test("should return 200 when permission is updated", async () => {
            const expectedData = { message: "Updated" };
            const inputData : Permission = {
                id: 0,
                userId: 0,
                folderId: 0,
                fileId: 0,
                canRead: false,
                canWrite: false,
                canDelete: false
            };
            jest.spyOn(mockUpdatePermission, "execute").mockImplementationOnce(async () => Promise.resolve(true));

            const response = await request(server).put("/permissions/0").send(inputData);

            expect(response.status).toEqual(200);
            expect(response.body).toStrictEqual(expectedData);
        });

        test("should return 500 when permission is not updated", async () => {
            const expectedData = { message: "Error updating permission" };
            const inputData : Permission = {
                id: 0,
                userId: 0,
                folderId: 0,
                fileId: 0,
                canRead: false,
                canWrite: false,
                canDelete: false
            };
            jest.spyOn(mockUpdatePermission, "execute").mockImplementationOnce(async () => Promise.reject(Error()));

            const response = await request(server).put("/permissions/0").send(inputData);

            expect(response.status).toEqual(500);
            expect(response.body).toStrictEqual(expectedData);
        });
    });

    describe("GET /permissions", () => {
        test("should return 200 when permissions are fetched", async () => {
            const expectedData : Permission[] = [];
            jest.spyOn(mockGetPermissions, "execute").mockImplementation(() => Promise.resolve(expectedData));

            const response = await request(server).get("/permissions");

            expect(response.status).toBe(200);
            expect(response.body).toStrictEqual(expectedData);
        });

        test("should return 500 when permissions are not fetched", async () => {
            const expectedData = { message: "Error fetching permissions" };
            jest.spyOn(mockGetPermissions, "execute").mockImplementation(() => Promise.reject(Error()));

            const response = await request(server).get("/permissions");

            expect(response.status).toBe(500);
            expect(response.body).toStrictEqual(expectedData);
        });
    });
});