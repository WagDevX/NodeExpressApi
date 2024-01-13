import { User } from "../../entities/user";

export interface GetUsersUseCase {
  execute: () => Promise<User[]>;
}
