export interface ResetPasswordUseCase {
  execute: (token: string, id: number, password: string) => Promise<boolean>;
}
