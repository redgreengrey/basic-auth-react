import Router from "express";
import UserController from "./UserController.js";

import { check } from "express-validator";

const userRouter = new Router();

userRouter.post(
  "/signup",
  [
    check("username", "Имя пользователя не может быть пустым").notEmpty(),
    check(
      "password",
      "Пароль должен быть больше 4 и меньше 10 символов"
    ).isLength({ min: 4, max: 10 }),
  ],
  UserController.signup
);
userRouter.post("/login", UserController.login);
userRouter.get("/users", UserController.getAllUsers);

export { userRouter };
