export interface ChangeRoleUseCase {
  execute: (token: string, id: number, role: string) => Promise<boolean>;
}
