import { AuthRepository } from "../../auth/domain/repos/auth-repository";
import { MockAuthRepository } from "./change-password.test";

describe("ResetPasswordUseCase", () => {
  let mockAuthRepository: AuthRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockAuthRepository = new MockAuthRepository();
  });

  test("should return true if password is reset", async () => {
    const token = "valid_token";
    const id = 1;
    const newPassword = "new_password";

    jest
      .spyOn(mockAuthRepository, "resetPassword")
      .mockImplementation(async () => true);

    const result = await mockAuthRepository.resetPassword(
      token,
      id,
      newPassword
    );

    expect(result).toBe(true);
  });
});
