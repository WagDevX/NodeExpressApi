import { User } from "../../auth/domain/entities/user";
import { AuthRepository } from "../../auth/domain/repos/auth-repository";
import { MockAuthRepository } from "./change-password.test";

describe("RegisterUserUseCase", () => {
  let mockAuthRepository: AuthRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockAuthRepository = new MockAuthRepository();
  });

  test("should return true if user is registered", async () => {
    const inputData: User = {
      username: "username",
      password: "password",
    };

    jest
      .spyOn(mockAuthRepository, "registerUser")
      .mockImplementation(async () => inputData);

    const result = await mockAuthRepository.registerUser({
      username: "username",
      password: "password",
    });

    expect(result).toStrictEqual(inputData);
  });
});
