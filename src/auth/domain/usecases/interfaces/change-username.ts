export interface ChangeUserNameUseCase {
  execute: (token: string, id: number, username: string) => Promise<boolean>;
}
