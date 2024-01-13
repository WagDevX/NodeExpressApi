import { User } from "../../entities/user";

export interface LoginWithUserNameAndPasswordUseCase {
  execute: (user: User) => Promise<User>;
}
