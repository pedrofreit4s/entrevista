import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { UserController } from "../controllers/user.controller";

const userRoutes = Router();
const userController = new UserController();

userRoutes.use(ensureAuthenticated);

userRoutes.get("/e", userController.findAll);
userRoutes.get("/me", userController.me);
userRoutes.put("/:id", userController.update);
userRoutes.delete("/:id", userController.delete);

export { userRoutes };
