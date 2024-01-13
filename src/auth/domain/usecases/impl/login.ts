import { User } from "../../entities/user";
import { AuthRepository } from "../../repos/auth-repository";
import { LoginWithUserNameAndPasswordUseCase } from "../interfaces/login";

export class LoginWithUserNameAndPassword
  implements LoginWithUserNameAndPasswordUseCase
{
  constructor(private readonly repository: AuthRepository) {}

  async execute(user: User): Promise<User> {
    return await this.repository.loginWithUserNameAndPassword(user);
  }
}
