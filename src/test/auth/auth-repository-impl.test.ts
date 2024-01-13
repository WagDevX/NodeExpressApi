import { AuthDataSource } from "../../auth/data/datasources/interfaces/auth-data-source";
import { AuthRepositoryImpl } from "../../auth/data/repos/auth-repository-impl";
import { User } from "../../auth/domain/entities/user";
import { AuthRepository } from "../../auth/domain/repos/auth-repository";

class MockAuthDataSouce implements AuthDataSource {
    loginWithUserNameAndPassword(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    registerUser(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    changeUserName(id: number, username: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    resetPassword(id: number, password: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    changeRole(id: number, role: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    changePassword(id: number, oldPassword: string, newPassword: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getUsers(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
}

describe("AuthRepositoryImpl", () => {
    let mockAuthDataSource: AuthDataSource;
    let authRepository: AuthRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        mockAuthDataSource = new MockAuthDataSouce();
        authRepository = new AuthRepositoryImpl(mockAuthDataSource);
    });

    describe("get users", () => {
        test("should call getUsers from dataSource", async () => {
            const expectedData = [
                { id: 1, username: "user1", password: "password1", role: "admin" },
            ];
            jest
                .spyOn(mockAuthDataSource, "getUsers")
                .mockImplementation(() => Promise.resolve(expectedData));
            const result = await authRepository.getUsers();
            expect(result).toBe(expectedData);
        });
    });

    describe("login with username and password", () => {
        test("should call loginWithUserNameAndPassword from dataSource", async () => {
            const expectedData = { id: 1, username: "user1", password: "password1" };
            jest
                .spyOn(mockAuthDataSource, "loginWithUserNameAndPassword")
                .mockImplementation(() => Promise.resolve(expectedData));
            const result = await authRepository.loginWithUserNameAndPassword(expectedData);
            expect(result).toStrictEqual(expectedData);
        });
    });

    describe("register user", () => {
        test("should call registerUser from dataSource", async () => {
            const expectedData = { id: 1, username: "user1", password: "password1" };
            jest
                .spyOn(mockAuthDataSource, "registerUser")
                .mockImplementation(() => Promise.resolve(expectedData));
            const result = await authRepository.registerUser(expectedData);
            expect(result).toStrictEqual(expectedData);
        });
    });

    describe("change username", () => {
        test("should call changeUserName from dataSource", async () => {
            const inputData = { id: 1, username: "user1", password: "password1" };
            jest
                .spyOn(mockAuthDataSource, "changeUserName")
                .mockImplementation(() => Promise.resolve());
            const result = await authRepository.changeUserName(inputData.id, inputData.username);
            expect(result).resolves;
        });
    });

    describe("reset password", () => {
        test("should call resetPassword from dataSource", async () => {
            const inputData = { id: 1, username: "user1", password: "password1" };
            jest
                .spyOn(mockAuthDataSource, "resetPassword")
                .mockImplementation(() => Promise.resolve());
            const result = await authRepository.resetPassword(inputData.id, inputData.password);
            expect(result).resolves;
        });
    });

    describe("change role", () => {
        test("should call changeRole from dataSource", async () => {
            const inputData = { id: 1, username: "user1", password: "password1" };
            jest
                .spyOn(mockAuthDataSource, "changeRole")
                .mockImplementation(() => Promise.resolve());
            const result = await authRepository.changeRole(inputData.id, inputData.password);
            expect(result).resolves;
        });
    });

    describe("change password", () => {
        test("should call changePassword from dataSource", async () => {
            const inputData = { id: 1, username: "user1", password: "password1" };
            jest
                .spyOn(mockAuthDataSource, "changePassword")
                .mockImplementation(() => Promise.resolve());
            const result = await authRepository.changePassword(inputData.id, inputData.password, inputData.password);
            expect(result).resolves;
        });
    });
});