import { Request, Response, NextFunction } from "express";

export interface VerifyPermissionsMiddleware {
  (req: Request, res: Response, next: NextFunction): Promise<void | Response<
    any,
    Record<string, any>
  >>;
}
