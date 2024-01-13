import { Permission } from "../../permissions/domain/entities/permission";
import { PermissionsRepository } from "../../permissions/domain/repos/permissions-repository";

export class MockPermissionsRepository implements PermissionsRepository {
    createPermission(permission: Permission): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    updatePermission(id: number, permission: Permission): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getPermissions(): Promise<Permission[]> {
        throw new Error("Method not implemented.");
    }
}

describe('Create Permission Use Case', () => {
    let mockPermissionsRepository: PermissionsRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        mockPermissionsRepository = new MockPermissionsRepository();
    });

    test('should call the repository and return a ture promise', async () => {
        const permission: Permission = {
            id: 1,
            userId: 0,
            folderId: 0,
            fileId: 0,
            canRead: false,
            canWrite: false,
            canDelete: false
        };

        jest.spyOn(mockPermissionsRepository, 'createPermission').mockImplementation(() => Promise.resolve(true));

        const result = await mockPermissionsRepository.createPermission(permission);

        expect(result).toBeTruthy();
    });
});