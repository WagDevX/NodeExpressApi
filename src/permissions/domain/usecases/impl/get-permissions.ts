import { Permission } from "../../entities/permission";
import { PermissionsRepository } from "../../repos/permissions-repository";
import { GetPermissionsUseCase } from "../interfaces/get-permissions";

export class GetPermissions implements GetPermissionsUseCase {
    constructor(private readonly permissionRepository: PermissionsRepository) { }
    async execute() : Promise<Permission[]> {
        return await this.permissionRepository.getPermissions();
    }
}