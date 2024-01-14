import { Request, Response, NextFunction } from "express";
import { VerifyPermissionsMiddleware } from "../core/middleware/interface/verify-permission";

const mockVerifyPermissionsMiddleware: VerifyPermissionsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // This mock simply calls the next function without performing any logic
  next();
};

export default mockVerifyPermissionsMiddleware;
