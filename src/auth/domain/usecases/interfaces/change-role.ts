export interface ChangeRoleUseCase {
  execute: (id: number, role: string) => Promise<boolean>;
}
