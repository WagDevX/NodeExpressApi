import express, { Request, Response } from "express";
import { CreateFolderUseCase } from "../../domain/usecases/interfaces/create-folder";
import { DeleteFolderUseCase } from "../../domain/usecases/interfaces/delete-folder";
import { GetFoldersUseCase } from "../../domain/usecases/interfaces/get-folders";
import { MoveFolderUseCase } from "../../domain/usecases/interfaces/move-folder";
import { RenameFolderUseCase } from "../../domain/usecases/interfaces/rename-folder";
import { FindFolderByIdUseCase } from "../../domain/usecases/interfaces/find-folder-by-id";
import { FindFolderByOwnerUseCase } from "../../domain/usecases/interfaces/find-folder-by-owner";
import { VerifyPermissionsMiddleware } from "../../../core/middleware/interface/verify-permission";

export default function FoldersRouter(
  getFoldersUseCase: GetFoldersUseCase,
  createFolderUseCase: CreateFolderUseCase,
  moveFolderUseCase: MoveFolderUseCase,
  renameFolderUseCase: RenameFolderUseCase,
  deleteFolderUseCase: DeleteFolderUseCase,
  findFolderByIdUseCase: FindFolderByIdUseCase,
  FindFolderByOwnerUseCase: FindFolderByOwnerUseCase,
  verifyPermissionsMiddleware: VerifyPermissionsMiddleware
) {
  const router = express.Router();

  router.get("/getall", async (req: Request, res: Response) => {
    try {
      const folders = await getFoldersUseCase.execute();
      res.send(folders);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Error fetching folders" });
    }
  });

  router.get(
    "/:id",
    verifyPermissionsMiddleware,
    async (req: Request, res: Response) => {
      try {
        const folders = await findFolderByIdUseCase.execute(
          Number(req.params.id)
        );
        res.send(folders);
      } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Error fetching folder" });
      }
    }
  );

  router.get(
    "/owner/:id",
    verifyPermissionsMiddleware,
    async (req: Request, res: Response) => {
      try {
        const folders = await FindFolderByOwnerUseCase.execute(
          Number(req.params.id)
        );
        res.send(folders);
      } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Error fetching folder" });
      }
    }
  );

  router.post("/", async (req: Request, res: Response) => {
    try {
      await createFolderUseCase.execute(req.body);
      res.statusCode = 201;
      res.json({ message: "Created" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Error creating folder" });
    }
  });

  router.put(
    "/rename/:id",
    verifyPermissionsMiddleware,
    async (req: Request, res: Response) => {
      try {
        await renameFolderUseCase.execute(Number(req.params.id), req.body.name);
        res.statusCode = 201;
        res.json({ message: "Updated" });
      } catch (err) {
        res.status(500).send({ message: "Error renaming folder" });
      }
    }
  );

  router.put(
    "/move/:id",
    verifyPermissionsMiddleware,
    async (req: Request, res: Response) => {
      try {
        await moveFolderUseCase.execute(
          Number(req.params.id),
          req.body.parentFolder
        );
        res.statusCode = 201;
        res.json({ message: "Moved" });
      } catch (err) {
        res.status(500).send({ message: "Error moving folder" });
      }
    }
  );

  router.delete(
    "/:id",
    verifyPermissionsMiddleware,
    async (req: Request, res: Response) => {
      try {
        await deleteFolderUseCase.execute(Number(req.params.id));
        res.statusCode = 201;
        res.json({ message: "Deleted" });
      } catch (err) {
        console.log(err);
        const error = JSON.stringify(err);
        if (error.includes("folder_parentfolder_fkey")) {
          res.status(505).send({
            message: "Error deleting folder: Folder is not empty",
          });
        }
        if (error.includes("files_parentfolder_fkey")) {
          res.status(505).send({
            message: "Error deleting folder: Folder has files inside",
          });
        }
        res.status(500).send({ message: "Error deleting folder" });
      }
    }
  );

  return router;
}
