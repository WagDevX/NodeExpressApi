import { User } from "../../entities/user";
import { AuthRepository } from "../../repos/auth-repository";
import { RegisterUserUseCase } from "../interfaces/register-user";

export class RegisterUser implements RegisterUserUseCase {
  constructor(private readonly repository: AuthRepository) {}

  async execute(user: User): Promise<User> {
    return await this.repository.registerUser(user);
  }
}
