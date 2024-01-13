import { PermissionsRepository } from "../../permissions/domain/repos/permissions-repository";
import { MockPermissionsRepository } from "./create-permision.test";

describe("Update Permission Use Case", () => {
    let mockPermissionsRepository : PermissionsRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        mockPermissionsRepository = new MockPermissionsRepository();
    });

    test("should call the repository and return a true promise", async () => {
        const permission = {
            id: 1,
            userId: 0,
            folderId: 0,
            fileId: 0,
            canRead: false,
            canWrite: false,
            canDelete: false
        }

        jest.spyOn(mockPermissionsRepository, "updatePermission").mockImplementation(() => Promise.resolve(true));

        const result = await mockPermissionsRepository.updatePermission(permission.id, permission);

        expect(result).toBeTruthy();
    });
});