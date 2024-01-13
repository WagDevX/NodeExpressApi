import { Permission } from "../entities/permission";

export interface PermissionsRepository {
    createPermission(permission: Permission): Promise<boolean>;
    updatePermission(id: number, permission: Permission): Promise<boolean>;
    getPermissions(): Promise<Permission[]>;
}