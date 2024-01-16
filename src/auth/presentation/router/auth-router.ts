import express from "express";
import { ChangePasswordUseCase } from "../../domain/usecases/interfaces/change-password";
import { ChangeRoleUseCase } from "../../domain/usecases/interfaces/change-role";
import { ChangeUserNameUseCase } from "../../domain/usecases/interfaces/change-username";
import { GetUsersUseCase } from "../../domain/usecases/interfaces/get-users";
import { LoginWithUserNameAndPasswordUseCase } from "../../domain/usecases/interfaces/login";
import { RegisterUserUseCase } from "../../domain/usecases/interfaces/register-user";
import { ResetPasswordUseCase } from "../../domain/usecases/interfaces/reset-password";

export default function AuthRouter(
  loginUseCase: LoginWithUserNameAndPasswordUseCase,
  registerUseCase: RegisterUserUseCase,
  changeRoleUseCase: ChangeRoleUseCase,
  changeUserNameUseCase: ChangeUserNameUseCase,
  changePasswordUseCase: ChangePasswordUseCase,
  getUsersUseCase: GetUsersUseCase,
  resetPasswordUseCase: ResetPasswordUseCase
) {
  const router = express.Router();

  router.get("/getall", async (req: any, res: any) => {
    try {
      const users = await getUsersUseCase.execute();
      res.send(users);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Error fetching users" });
    }
  });

  router.post("/login", async (req: any, res: any) => {
    if (req.body.password === "") {
      res.status(404).send({ message: "Password is required" });
      return;
    }
    if (req.body.username === "") {
      res.status(404).send({ message: "Username is required" });
      return;
    }
    try {
      const user = await loginUseCase.execute(req.body);
      res.send(user);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Authentication failed" });
    }
  });

  router.post("/register", async (req: any, res: any) => {
    try {
      await registerUseCase.execute(req.body);
      res.statusCode = 201;
      res.json({ message: "Created" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Error registering user" });
    }
  });

  router.put("/changerole", async (req: any, res: any) => {
    try {
      await changeRoleUseCase.execute(req.body.id, req.body.role);
      res.statusCode = 201;
      res.json({ message: "Created" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Error changing role" });
    }
  });

  router.put("/changeusername", async (req: any, res: any) => {
    try {
      await changeUserNameUseCase.execute(req.body.id, req.body.username);
      res.statusCode = 201;
      res.json({ message: "Created" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Error changing username" });
    }
  });

  router.put("/changepassword", async (req: any, res: any) => {
    try {
      await changePasswordUseCase.execute(
        req.body.id,
        req.body.password,
        req.body.newPassword
      );
      res.statusCode = 201;
      res.json({ message: "Created" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Error changing password" });
    }
  });

  router.put("/resetpassword", async (req: any, res: any) => {
    try {
      await resetPasswordUseCase.execute(req.body.id, req.body.password);
      res.statusCode = 201;
      res.json({ message: "Created" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Error resetting password" });
    }
  });

  return router;
}
