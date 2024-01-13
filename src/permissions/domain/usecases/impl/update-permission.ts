import { Permission } from "../../entities/permission";
import { PermissionsRepository } from "../../repos/permissions-repository";
import { UpdatePermissionUseCase } from "../interfaces/update-permission";

export class UpdatePermission implements UpdatePermissionUseCase {
    constructor(private readonly repository: PermissionsRepository) { }
    async execute(id: number, permission: Permission): Promise<boolean> {
        return await this.repository.updatePermission(id, permission);
    }
}