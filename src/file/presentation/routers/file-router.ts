import express, { Request, Response } from "express";
import { CreateFileUseCase } from "../../domain/usecases/interfaces/create-file";
import { MoveFileUseCase } from "../../domain/usecases/interfaces/move-file";
import { RenameFileUseCase } from "../../domain/usecases/interfaces/rename-file";
import { DeleteFileUseCase } from "../../domain/usecases/interfaces/delete-file";
import { FindFileByFolderUseCase } from "../../domain/usecases/interfaces/find-file-by-folder";
import { FindFolderByOwnerUseCase } from "../../../folder/domain/usecases/interfaces/find-folder-by-owner";

export default function FileRouter(
  createFileUseCase: CreateFileUseCase,
  moveFileUseCase: MoveFileUseCase,
  renameFileUseCase: RenameFileUseCase,
  deleteFileUseCase: DeleteFileUseCase,
  findFileByFolderUseCase: FindFileByFolderUseCase
) {
  const router = express.Router();

  router.get("/:id", async (req: Request, res: Response) => {
    try {
      const files = await findFileByFolderUseCase.execute(
        Number(req.params.id)
      );
      res.send(files);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Error fetching file" });
    }
  });

  router.post("/", async (req: Request, res: Response) => {
    try {
      await createFileUseCase.execute(req.body);
      res.statusCode = 201;
      res.json({ message: "Created" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Error creating file" });
    }
  });

  router.put("/rename/:id", async (req: Request, res: Response) => {
    try {
      await renameFileUseCase.execute(Number(req.params.id), req.body.name);
      res.statusCode = 201;
      res.json({ message: "Renamed" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Error renaming file" });
    }
  });

  router.put("/move/:id", async (req: Request, res: Response) => {
    try {
      await moveFileUseCase.execute(Number(req.params.id), req.body.folderId);
      res.statusCode = 201;
      res.json({ message: "Moved" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Error moving file" });
    }
  });

  router.delete("/:id", async (req: Request, res: Response) => {
    try {
      await deleteFileUseCase.execute(Number(req.params.id));
      res.statusCode = 201;
      res.json({ message: "Deleted" });
    } catch (err) {
      res.status(500).send({ message: "Error deleting file" });
    }
  });

  return router;
}
