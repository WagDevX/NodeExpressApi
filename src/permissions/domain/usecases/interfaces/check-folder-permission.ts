import { Permission } from "../../entities/permission";

export interface CheckFolderPermissionUseCase {
  execute(userId: number, folderId: number): Promise<Permission>;
}
