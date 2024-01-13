export interface ChangePasswordUseCase {
  execute: (
    token: string,
    id: number,
    newPassword: string,
    oldPassword: string
  ) => Promise<boolean>;
}
