export interface ChangePasswordUseCase {
  execute: (
    id: number,
    newPassword: string,
    oldPassword: string
  ) => Promise<boolean>;
}
