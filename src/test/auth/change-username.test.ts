import { AuthRepository } from "../../auth/domain/repos/auth-repository";
import { MockAuthRepository } from "./change-password.test";

describe("ChangeUsernameUseCase", () => {
  let mockAuthRepository: AuthRepository;
  beforeEach(() => {
    jest.clearAllMocks();
    mockAuthRepository = new MockAuthRepository();
  });
  test("should return true if username is changed", async () => {
    const token = "valid_token";
    const id = 1;
    const username = "new_username";
    jest
      .spyOn(mockAuthRepository, "changeUserName")
      .mockImplementation(async () => true);
    const result = await mockAuthRepository.changeUserName(token, id, username);
    expect(result).toBe(true);
  });
});
