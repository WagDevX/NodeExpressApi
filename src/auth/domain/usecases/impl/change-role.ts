import { AuthRepository } from "../../repos/auth-repository";
import { ChangeRoleUseCase } from "../interfaces/change-role";

export class ChangeRole implements ChangeRoleUseCase {
  constructor(private readonly repository: AuthRepository) {}
  async execute(token: string, id: number, role: string): Promise<boolean> {
    return await this.repository.changeRole(token, id, role);
  }
}
