import { AuthRepository } from "../../repos/auth-repository";
import { ChangePasswordUseCase } from "../interfaces/change-password";

export class ChangePassword implements ChangePasswordUseCase {
  constructor(private readonly repository: AuthRepository) {}
  async execute(
    id: number,
    newPassword: string,
    oldPassword: string
  ): Promise<boolean> {
    return await this.repository.changePassword(
      id,
      newPassword,
      oldPassword
    );
  }
}
