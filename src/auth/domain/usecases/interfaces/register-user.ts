import { User } from "../../entities/user";

export interface RegisterUserUseCase {
  execute: (user: User) => Promise<User>;
}
