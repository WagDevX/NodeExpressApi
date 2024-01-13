import { Permission } from "../../entities/permission";

export interface UpdatePermissionUseCase {
    execute(id: number, permission: Permission): Promise<boolean>;
}