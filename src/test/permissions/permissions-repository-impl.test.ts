import { PermissionsDataSource } from "../../permissions/data/datasources/interfaces/permissions-data-source";
import { PermissionsRepositoryImpl } from "../../permissions/data/repos/permissions-repository-impl";
import { Permission } from "../../permissions/domain/entities/permission";
import { PermissionsRepository } from "../../permissions/domain/repos/permissions-repository";

class MockPermissionDataSource implements PermissionsDataSource {
    createPermission(permission: Permission): Promise<void> {
        throw new Error("Method not implemented.");
    }
    updatePermission(id: number, permission: Permission): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getPermissions(): Promise<Permission[]> {
        throw new Error("Method not implemented.");
    }
}

describe("Permissions Repository", () => {
    let mockPermissionsDataSource : PermissionsDataSource;
    let mockRepository : PermissionsRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        mockPermissionsDataSource = new MockPermissionDataSource();
        mockRepository = new PermissionsRepositoryImpl(mockPermissionsDataSource);
    });

    describe("Create Permission", () => {
        test("should call the data source and return a true promise", async () => {
            const permission = {
                id: 1,
                userId: 0,
                folderId: 0,
                fileId: 0,
                canRead: false,
                canWrite: false,
                canDelete: false
            }

            jest.spyOn(mockPermissionsDataSource, "createPermission").mockImplementation(() => Promise.resolve());

            const result = await mockRepository.createPermission(permission);

            expect(result).toBeTruthy();
        });
    });

    describe("Update Permission", () => {
        test("should call the data source and return a true promise", async () => {
            const permission = {
                id: 1,
                userId: 0,
                folderId: 0,
                fileId: 0,
                canRead: false,
                canWrite: false,
                canDelete: false
            }

            jest.spyOn(mockPermissionsDataSource, "updatePermission").mockImplementation(() => Promise.resolve());

            const result = await mockRepository.updatePermission(permission.id, permission);

            expect(result).toBeTruthy();
        });
    });

    describe("Get Permissions", () => {
        test("should call the data source and return list of permissions", async () => {
            const permission = {
                id: 1,
                userId: 0,
                folderId: 0,
                fileId: 0,
                canRead: false,
                canWrite: false,
                canDelete: false
            }

            jest.spyOn(mockPermissionsDataSource, "getPermissions").mockImplementation(() => Promise.resolve([permission]));

            const result = await mockRepository.getPermissions();

            expect(result).toStrictEqual([permission]);
        });
    });
});