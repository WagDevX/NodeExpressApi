import { User } from "../../auth/domain/entities/user";
import { AuthRepository } from "../../auth/domain/repos/auth-repository";

export class MockAuthRepository implements AuthRepository {
  loginWithUserNameAndPassword(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  registerUser(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  changeUserName(
    token: string,
    id: number,
    username: string
  ): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  resetPassword(token: string, id: number, password: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  changeRole(token: string, id: number, role: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  changePassword(
    token: string,
    id: number,
    oldPassword: string,
    newPassword: string
  ): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  getUsers(token: string): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
}

describe("ChangePasswordUseCase", () => {
  let mockAuthRepository: AuthRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockAuthRepository = new MockAuthRepository();
  });

  test("should return true if password is changed", async () => {
    const inputData = {
      token: "token",
      id: 1,
      oldPassword: "oldPassword",
      newPassword: "newPassword",
    };

    jest
      .spyOn(mockAuthRepository, "changePassword")
      .mockImplementation(async () => true);

    const result = await mockAuthRepository.changePassword(
      inputData.token,
      inputData.id,
      inputData.oldPassword,
      inputData.newPassword
    );

    expect(result).toBeTruthy();
  });
});
