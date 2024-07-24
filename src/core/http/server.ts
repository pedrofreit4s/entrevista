import express from "express";
import cors from "cors";
import { authRoutes } from "./routes/auth.routes";
import { userRoutes } from "./routes/user.routes";

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());

/**
 * Auth Routes
 */
server.use("/api/auth", authRoutes);

/**
 * User Routes
 */
server.use("/api/users", userRoutes);

export { server };
