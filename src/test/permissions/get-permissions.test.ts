import { PermissionsRepository } from "../../permissions/domain/repos/permissions-repository";
import { MockPermissionsRepository } from "./create-permision.test";

describe("Get Permissions Use Case", () => {
  let mockPermissionsRepository: PermissionsRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockPermissionsRepository = new MockPermissionsRepository();
  });

  test("should call the repository and return a list of permissions", async () => {
    const expectedPermissions = [
      {
        id: 1,
        userId: 0,
        folderId: 0,
        canRead: false,
        canWrite: false,
        canDelete: false,
      },
    ];
    jest
      .spyOn(mockPermissionsRepository, "getPermissions")
      .mockImplementation(() => Promise.resolve(expectedPermissions));

    const result = await mockPermissionsRepository.getPermissions();

    expect(result).toStrictEqual(expectedPermissions);
  });
});
