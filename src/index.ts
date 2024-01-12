import { PGFolderDataSource } from "./folder/data/datasources/impl/pg-folder-data-source";
import { FolderRepositoryImpl } from "./folder/data/repos/folder-repository-impl";
import { CreateFolder } from "./folder/domain/usecases/impl/create-folder";
import { DeleteFolder } from "./folder/domain/usecases/impl/delete-folder";
import { FindFolderById } from "./folder/domain/usecases/impl/find-folder-by-id";
import { FindFolderByOwner } from "./folder/domain/usecases/impl/find-folder-by-owner";
import { GetFolders } from "./folder/domain/usecases/impl/get-folders";
import { MoveFolder } from "./folder/domain/usecases/impl/move-folder";
import { RenameFolder } from "./folder/domain/usecases/impl/rename-folder";
import FoldersRouter from "./folder/presentation/routers/folder-router";
import server from "./server";

var Pool = require("pg-pool");

async function getPGDS() {
  const db = new Pool({
    user: "postgres",
    host: "node-express-api.ctqwqysmcezc.sa-east-1.rds.amazonaws.com",
    database: "postgres",
    password: "fUhnnucQUzoXTFiWmPiQ",
    port: 5432,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  return new PGFolderDataSource(db);
}

(async () => {
  const dataSource = await getPGDS();

  const folderMiddleWare = FoldersRouter(
    new GetFolders(new FolderRepositoryImpl(dataSource)),
    new CreateFolder(new FolderRepositoryImpl(dataSource)),
    new MoveFolder(new FolderRepositoryImpl(dataSource)),
    new RenameFolder(new FolderRepositoryImpl(dataSource)),
    new DeleteFolder(new FolderRepositoryImpl(dataSource)),
    new FindFolderById(new FolderRepositoryImpl(dataSource)),
    new FindFolderByOwner(new FolderRepositoryImpl(dataSource))
  );

  server.use("/folder", folderMiddleWare);
  server.listen(4000, () => console.log("Running on http://localhost:4000"));
})();
