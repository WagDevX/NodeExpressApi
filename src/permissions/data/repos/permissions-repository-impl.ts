import { Permission } from "../../domain/entities/permission";
import { PermissionsRepository } from "../../domain/repos/permissions-repository";
import { PermissionsDataSource } from "../datasources/interfaces/permissions-data-source";

export class PermissionsRepositoryImpl implements PermissionsRepository {
  constructor(private readonly dataSource: PermissionsDataSource) {}
  checkFolderPermission(userId: number, folderId: number): Promise<Permission> {
    throw new Error("Method not implemented.");
  }
  async createPermission(permission: Permission): Promise<boolean> {
    await this.dataSource.createPermission(permission);
    return true;
  }
  async updatePermission(id: number, permission: Permission): Promise<boolean> {
    await this.dataSource.updatePermission(id, permission);
    return true;
  }
  async getPermissions(): Promise<Permission[]> {
    return await this.dataSource.getPermissions();
  }
}
