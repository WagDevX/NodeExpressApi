import { User } from "../../auth/domain/entities/user";
import { AuthRepository } from "../../auth/domain/repos/auth-repository";
import { MockAuthRepository } from "./change-password.test";

describe("GetUsersUseCase", () => {
  let mockAuthRepository: AuthRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockAuthRepository = new MockAuthRepository();
  });

  test("should return a list of Users", async () => {
    const expectedData: User[] = [
      {
        id: 1,
        username: "username",
        role: "admin",
      },
    ];

    jest
      .spyOn(mockAuthRepository, "getUsers")
      .mockImplementation(async () => expectedData);

    const result = await mockAuthRepository.getUsers();

    expect(result).toStrictEqual(expectedData);
  });
});
