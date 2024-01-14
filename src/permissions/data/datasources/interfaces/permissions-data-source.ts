import { Permission } from "../../../domain/entities/permission";

export interface PermissionsDataSource {
  createPermission(permission: Permission): Promise<void>;
  updatePermission(id: number, permission: Permission): Promise<void>;
  getPermissions(): Promise<Permission[]>;
  checkFolderPermission(userId: number, folderId: number): Promise<Permission>;
}
