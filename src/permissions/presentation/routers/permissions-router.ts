import express from "express";
import { CreatePermissionUseCase } from "../../domain/usecases/interfaces/create-permission";
import { GetPermissionsUseCase } from "../../domain/usecases/interfaces/get-permissions";
import { UpdatePermissionUseCase } from "../../domain/usecases/interfaces/update-permission";

export default function PermissionsRouter(
    createPermission : CreatePermissionUseCase,
    updatePermission : UpdatePermissionUseCase,
    getPermissions : GetPermissionsUseCase
) {

    const router = express.Router();

    router.post("/", async (req, res) => {
        try {
            await createPermission.execute(req.body);
            res.statusCode = 201;
            res.json({ message: "Created" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error creating permission" });
        }
    });

    router.put("/:id", async (req, res) => {
        try {
            await updatePermission.execute(Number(req.params.id), req.body);
            res.statusCode = 200;
            res.json({ message: "Updated" });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error updating permission" });
        }
    });

    router.get("/", async (req, res) => {
        try {
            const permissions = await getPermissions.execute();
            res.statusCode = 200;
            res.send(permissions);
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error fetching permissions" });
        }
    });
    return router;
}