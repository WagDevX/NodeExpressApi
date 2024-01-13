import { User } from "../../domain/entities/user";
import { AuthRepository } from "../../domain/repos/auth-repository";
import { AuthDataSource } from "../datasources/interfaces/auth-data-source";

export class AuthRepositoryImpl implements AuthRepository {
    constructor(private readonly dataSource : AuthDataSource) {}
    async loginWithUserNameAndPassword(user: User): Promise<User> {
        return await this.dataSource.loginWithUserNameAndPassword(user);
    }

    async registerUser(user: User): Promise<User> {
        return await this.dataSource.registerUser(user);
    }

    async changeUserName(id: number, username: string): Promise<boolean> {
        await this.dataSource.changeUserName(id, username);
        return true;
    }

    async resetPassword(id: number, password: string): Promise<boolean> {
        await this.dataSource.resetPassword(id, password);
        return true;
    }

    async changeRole(id: number, role: string): Promise<boolean> {
        await this.dataSource.changeRole(id, role);
        return true;
    }
    async changePassword(id: number, oldPassword: string, newPassword: string): Promise<boolean> {
        await this.dataSource.changePassword(id, oldPassword, newPassword);
        return true;
    }

    async getUsers(): Promise<User[]> {
        return await this.dataSource.getUsers();
    }
    
}