import { Permission } from "../../entities/permission";
import { PermissionsRepository } from "../../repos/permissions-repository";
import { CheckFolderPermissionUseCase } from "../interfaces/check-folder-permission";

class CheckFolderPermission implements CheckFolderPermissionUseCase {
  constructor(private readonly permissionRepository: PermissionsRepository) {}
  async execute(userId: number, folderId: number): Promise<Permission> {
    return await this.permissionRepository.checkFolderPermission(
      userId,
      folderId
    );
  }
}
