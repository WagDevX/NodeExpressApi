export interface ChangeUserNameUseCase {
  execute: (id: number, username: string) => Promise<boolean>;
}
