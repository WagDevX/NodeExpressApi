import { User } from "../../entities/user";

export interface GetUsersUseCase {
  execute: (token: string) => Promise<User[]>;
}
