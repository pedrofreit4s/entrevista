import { NextFunction, Request, Response } from "express";
import { config } from "../../../config";
import jwt from "jsonwebtoken";

export function ensureAuthenticated(
  request: any,
  response: Response,
  next: NextFunction
) {
  const token = request.header("Authorization")?.replace("Bearer ", "");

  if (!token)
    return response
      .status(401)
      .send({ Error: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as any;
    request.userId = decoded.id;

    next();
  } catch (error) {
    console.log(error);
    response.status(400).send({ error: "Invalid token." });
  }
}
