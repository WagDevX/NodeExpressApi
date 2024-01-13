import { User } from "../../entities/user";
import { AuthRepository } from "../../repos/auth-repository";
import { GetUsersUseCase } from "../interfaces/get-users";

export class GetUsers implements GetUsersUseCase {
  constructor(private readonly repository: AuthRepository) {}

  async execute(token: string): Promise<User[]> {
    return await this.repository.getUsers(token);
  }
}
