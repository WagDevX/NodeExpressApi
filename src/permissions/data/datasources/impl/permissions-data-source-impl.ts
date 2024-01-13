import { SQLDatabaseWrapper } from "../../../../folder/data/datasources/wrapper/sql-database-wrapper";
import { Permission } from "../../../domain/entities/permission";
import { PermissionsDataSource } from "../interfaces/permissions-data-source";

export class PermissionDataSourceImpl implements PermissionsDataSource {
    constructor(private readonly db : SQLDatabaseWrapper) {}

    async createPermission(permission: Permission): Promise<void> {
        const query = `INSERT INTO permissions (userid, folderid, fileid, canread, canwrite, candelete) VALUES (?, ?, ?, ?, ?, ?)`;
        const params = [permission.userId, permission.folderId, permission.fileId, permission.canRead, permission.canWrite, permission.canDelete];
        await this.db.query(query, params);
    }

    async updatePermission(id: number, permission: Permission): Promise<void> {
        const query = `UPDATE permissions SET userid = ?, folderid = ?, fileid = ?, canread = ?, canwrite = ?, candelete = ? WHERE id = ?`;
        const params = [permission.userId, permission.folderId, permission.fileId, permission.canRead, permission.canWrite, permission.canDelete, id];
        await this.db.query(query, params);
    }

    async getPermissions(): Promise<Permission[]> {
        const query = `SELECT * FROM permissions`;
        const result = await this.db.query(query);
        return result.rows;
    }
}