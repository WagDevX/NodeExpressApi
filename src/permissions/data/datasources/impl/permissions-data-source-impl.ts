import { SQLDatabaseWrapper } from "../../../../folder/data/datasources/wrapper/sql-database-wrapper";
import { Permission } from "../../../domain/entities/permission";
import { PermissionsDataSource } from "../interfaces/permissions-data-source";

export class PermissionDataSourceImpl implements PermissionsDataSource {
  constructor(private readonly db: SQLDatabaseWrapper) {}
  async checkFolderPermission(
    userId: number,
    folderId: number
  ): Promise<Permission> {
    const query = `SELECT * FROM permissions WHERE userid = ${userId} AND folderid = ${folderId}`;
    const result = await this.db.query(query);
    const permission = result.rows.map((item) => {
      return {
        id: item.id,
        userId: item.userid,
        folderId: item.folderid,
        canRead: item.canread,
        canWrite: item.canwrite,
        canDelete: item.candelete,
      };
    });
    return permission[0];
  }

  async createPermission(permission: Permission): Promise<void> {
    const query = `INSERT INTO permissions (userid, folderid, canread, canwrite, candelete) VALUES (${
      permission.userId
    }, ${permission.folderId ?? null} ${permission.canRead ?? false},  ${
      permission.canWrite ?? false
    },  ${permission.canDelete ?? false})`;
    await this.db.query(query);
  }

  async updatePermission(id: number, permission: Permission): Promise<void> {
    const query = `UPDATE permissions SET userid = ${
      permission.userId
    }, folderid = ${permission.folderId ?? null},  
      canread = ${permission.canRead ?? false}, canwrite = ${
      permission.canWrite ?? false
    }, candelete = ${permission.canDelete ?? false} WHERE id = ${id}`;
    await this.db.query(query);
  }

  async getPermissions(): Promise<Permission[]> {
    const query = `SELECT * FROM permissions`;
    const result = await this.db.query(query);
    return result.rows;
  }
}
