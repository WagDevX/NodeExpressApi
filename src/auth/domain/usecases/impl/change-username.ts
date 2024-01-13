import { AuthRepository } from "../../repos/auth-repository";
import { ChangeUserNameUseCase } from "../interfaces/change-username";

export class ChangeUserName implements ChangeUserNameUseCase {
  constructor(private readonly repository: AuthRepository) {}
  async execute(
    id: number,
    name: string,
  ): Promise<boolean> {
    return await this.repository.changeUserName(
      id,
      name
    );
  }
}
