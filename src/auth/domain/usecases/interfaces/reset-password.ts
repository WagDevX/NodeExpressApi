export interface ResetPasswordUseCase {
  execute: (id: number, password: string) => Promise<boolean>;
}
