import { AuthRepository } from "../../repos/auth-repository";
import { ResetPasswordUseCase } from "../interfaces/reset-password";

export class ResetPassword implements ResetPasswordUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(token: string, id: number, password: string): Promise<boolean> {
    return await this.authRepository.resetPassword(token, id, password);
  }
}
