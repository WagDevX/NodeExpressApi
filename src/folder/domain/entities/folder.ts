import { User } from "../../../auth/domain/entities/user";

export interface Folder {
  id?: number;
  name: string;
  owner: number;
  parentFolder?: number;
}
