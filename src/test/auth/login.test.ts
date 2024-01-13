import { AuthRepository } from "../../auth/domain/repos/auth-repository";
import { MockAuthRepository } from "./change-password.test";

describe("LoginUseCase", () => {
  let mockAuthRepository: AuthRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockAuthRepository = new MockAuthRepository();
  });

  test("should return a User if login is successful", async () => {
    const expectedData = {
      id: 1,
      username: "username",
      role: "admin",
    };

    jest
      .spyOn(mockAuthRepository, "loginWithUserNameAndPassword")
      .mockImplementation(async () => expectedData);

    const result = await mockAuthRepository.loginWithUserNameAndPassword({
      username: "username",
      password: "password",
    });

    expect(result).toStrictEqual(expectedData);
  });
});
