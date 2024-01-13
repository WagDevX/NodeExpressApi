import { Permission } from "../../entities/permission";
import { PermissionsRepository } from "../../repos/permissions-repository";
import { CreatePermissionUseCase } from "../interfaces/create-permission";

export class CreatePermission implements CreatePermissionUseCase {
    constructor(private readonly permissionRepository: PermissionsRepository) { }
    async execute(permission: Permission): Promise<boolean> {
        return await this.permissionRepository.createPermission(permission);
    }

}