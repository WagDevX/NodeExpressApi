import { Permission } from "../../entities/permission";

export interface CreatePermissionUseCase {
    execute(permission: Permission): Promise<boolean>;
}