import { AuthRepository } from "../../auth/domain/repos/auth-repository";
import { MockAuthRepository } from "./change-password.test";
describe("ChangeRoleUseCase", () => {
  let mockAuthRepository: AuthRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockAuthRepository = new MockAuthRepository();
  });

  test("should return true if role is changed", async () => {
    const id = 1;
    const role = "admin";

    jest
      .spyOn(mockAuthRepository, "changeRole")
      .mockImplementation(async () => true);

    const result = await mockAuthRepository.changeRole(id, role);

    expect(result).toBe(true);
  });
});
