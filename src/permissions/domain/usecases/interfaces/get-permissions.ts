import { Permission } from "../../entities/permission";

export interface GetPermissionsUseCase {
    execute() : Promise<Permission[]>
}