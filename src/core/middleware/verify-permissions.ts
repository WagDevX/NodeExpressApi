import { Request, Response, NextFunction } from "express";
import { getPGDS } from "../..";
import config from "../config/auth-config";
import { VerifyPermissionsMiddleware } from "./interface/verify-permission";
var jwt = require("jsonwebtoken");

const verifyPermissionsMiddleware: VerifyPermissionsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const db = (await getPGDS()).permissionsDataSource;
  const folderDb = (await getPGDS()).folderDataSource;
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    jwt.verify(token, config.secret, async (err: any, decoded: any) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
      if (!decoded.user_id) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
      if (decoded.user_id === 1) {
        next();
      } else {
        if (req.method === "GET" && req.params.id === undefined) {
          return res.status(401).send({
            message: "Unauthorized!",
          });
        }
        const result = await db.checkFolderPermission(
          decoded.user_id,
          parseInt(req.params.id)
        );
        const folders = await folderDb.findFoldersByOwner(
          parseInt(decoded.user_id)
        );

        if (
          folders.filter(
            (folder) =>
              folder.owner === parseInt(decoded.user_id) &&
              folder.id === parseInt(req.params.id)
          ).length > 0
        ) {
          next();
        }
        if (result === undefined) {
          return res.status(401).send({
            message: "You don't have permission to access this!",
          });
        }
        if (
          (req.method === "GET" && result.canRead === false) ||
          result === undefined
        ) {
          return res.status(401).send({
            message: "You don't have permission to access this!",
          });
        }
        if (
          (req.method === "PUT" && result.canWrite === false) ||
          result === undefined
        ) {
          return res.status(401).send({
            message: "You don't have permission to modify this!",
          });
        }
        if (
          (req.method === "DELETE" && result.canDelete === false) ||
          result === undefined
        ) {
          return res.status(401).send({
            message: "You don't have permission to delete this!",
          });
        }
        next();
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default verifyPermissionsMiddleware;
