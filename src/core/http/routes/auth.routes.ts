import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post("/login", authController.authenticate);
authRoutes.post("/register", authController.create);

export { authRoutes };
