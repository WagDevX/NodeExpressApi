import { configDotenv } from "dotenv";
import { AuthDataSourceImpl } from "./auth/data/datasources/impl/auth-data-source-impl";
import { AuthRepositoryImpl } from "./auth/data/repos/auth-repository-impl";
import { ChangePassword } from "./auth/domain/usecases/impl/change-password";
import { ChangeRole } from "./auth/domain/usecases/impl/change-role";
import { ChangeUserName } from "./auth/domain/usecases/impl/change-username";
import { GetUsers } from "./auth/domain/usecases/impl/get-users";
import { LoginWithUserNameAndPassword } from "./auth/domain/usecases/impl/login";
import { RegisterUser } from "./auth/domain/usecases/impl/register-user";
import { ResetPassword } from "./auth/domain/usecases/impl/reset-password";
import AuthRouter from "./auth/presentation/router/auth-router";
import verifyPermissionsMiddleware from "./core/middleware/verify-permissions";
import { verifyToken } from "./core/middleware/verify-token";
import { FileDataSourceImpl } from "./file/data/datasources/impl/file-datasource-impl";
import { FileRepositoryImpl } from "./file/data/repos/file-repository-impl";
import { CreateFile } from "./file/domain/usecases/impl/create-file";
import { DeleteFile } from "./file/domain/usecases/impl/delete-file";
import { FindFileByFolder } from "./file/domain/usecases/impl/find-file-by-folder";
import { MoveFile } from "./file/domain/usecases/impl/move-file";
import { RenameFile } from "./file/domain/usecases/impl/rename-file";
import FileRouter from "./file/presentation/routers/file-router";
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
import { PermissionDataSourceImpl } from "./permissions/data/datasources/impl/permissions-data-source-impl";
import { PermissionsRepositoryImpl } from "./permissions/data/repos/permissions-repository-impl";
import { CreatePermission } from "./permissions/domain/usecases/impl/create-permission";
import { GetPermissions } from "./permissions/domain/usecases/impl/get-permissions";
import { UpdatePermission } from "./permissions/domain/usecases/impl/update-permission";
import PermissionsRouter from "./permissions/presentation/routers/permissions-router";
import server from "./server";

var Pool = require("pg-pool");

configDotenv();

export async function getPGDS() {
  const db = new Pool({
    user: process.env.RDS_USERNAME,
    host: process.env.RDS_HOSTNAME,
    database: "postgres",
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  return {
    folderDataSource: new PGFolderDataSource(db),
    fileDataSource: new FileDataSourceImpl(db),
    authDataSource: new AuthDataSourceImpl(db),
    permissionsDataSource: new PermissionDataSourceImpl(db),
  };
}

(async () => {
  const dataSource = await getPGDS();

  const folderMiddleWare = FoldersRouter(
    new GetFolders(new FolderRepositoryImpl(dataSource.folderDataSource)),
    new CreateFolder(new FolderRepositoryImpl(dataSource.folderDataSource)),
    new MoveFolder(new FolderRepositoryImpl(dataSource.folderDataSource)),
    new RenameFolder(new FolderRepositoryImpl(dataSource.folderDataSource)),
    new DeleteFolder(new FolderRepositoryImpl(dataSource.folderDataSource)),
    new FindFolderById(new FolderRepositoryImpl(dataSource.folderDataSource)),
    new FindFolderByOwner(
      new FolderRepositoryImpl(dataSource.folderDataSource)
    ),
    verifyPermissionsMiddleware
  );

  const fileMiddleWare = FileRouter(
    new CreateFile(new FileRepositoryImpl(dataSource.fileDataSource)),
    new MoveFile(new FileRepositoryImpl(dataSource.fileDataSource)),
    new RenameFile(new FileRepositoryImpl(dataSource.fileDataSource)),
    new DeleteFile(new FileRepositoryImpl(dataSource.fileDataSource)),
    new FindFileByFolder(new FileRepositoryImpl(dataSource.fileDataSource)),
    verifyPermissionsMiddleware
  );

  const authMiddleWare = AuthRouter(
    new LoginWithUserNameAndPassword(
      new AuthRepositoryImpl(dataSource.authDataSource)
    ),
    new RegisterUser(new AuthRepositoryImpl(dataSource.authDataSource)),
    new ChangeRole(new AuthRepositoryImpl(dataSource.authDataSource)),
    new ChangeUserName(new AuthRepositoryImpl(dataSource.authDataSource)),
    new ChangePassword(new AuthRepositoryImpl(dataSource.authDataSource)),
    new GetUsers(new AuthRepositoryImpl(dataSource.authDataSource)),
    new ResetPassword(new AuthRepositoryImpl(dataSource.authDataSource))
  );

  const permissionsMiddleWare = PermissionsRouter(
    new CreatePermission(
      new PermissionsRepositoryImpl(dataSource.permissionsDataSource)
    ),
    new UpdatePermission(
      new PermissionsRepositoryImpl(dataSource.permissionsDataSource)
    ),
    new GetPermissions(
      new PermissionsRepositoryImpl(dataSource.permissionsDataSource)
    )
  );

  server.use("/folder", verifyToken, folderMiddleWare);
  server.use("/auth", authMiddleWare);
  server.use("/files", verifyToken, fileMiddleWare);
  server.use("/permissions", verifyToken, permissionsMiddleWare);
  server.listen(8080, () => console.log("Running on http://localhost:8080"));
})();
