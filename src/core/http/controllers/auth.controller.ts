import { Request, Response } from "express";
import { prisma } from "../../database/connection";
import { config } from "../../../config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface IUserRequest extends Request {
  userId: string;
}

/**
 * Auth Controller
 * @class AuthController
 */
export class AuthController {
  /**
   * Create User Account
   * @param request
   * @param response
   * @returns
   */
  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;
    if (!name || !email || !password)
      return response.status(400).send({ error: "Informe todos os campos!" });

    // Verifica se já existe um usuário cadastrado com o e-mail informado
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userAlreadyExists)
      return response
        .status(400)
        .send({ error: "Já existe um usuário cadastrado com esse e-mail!" });

    // Cria um registro no banco
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: bcrypt.hashSync(password, 7),
      },
    });

    // Gera o JWT guardando o ID do usuário
    const accessToken = jwt.sign({ id: user.id }, config.jwtSecret);

    return response.status(201).send({
      accessToken,
      user,
    });
  }

  /**
   * Fazer a autenticação do usuário
   * @param request
   * @param response
   * @returns
   */
  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body;
    if (!email || !password)
      return response.status(400).send({ error: "Informe todos os campos!" });

    // Verifica se o e-mail foi cadastrado
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user)
      return response
        .status(400)
        .send({ error: "E-mail ou senha incorret1to(s)" });

    // Verifica se a senha está correta
    if (!bcrypt.compareSync(password, user.password))
      return response
        .status(400)
        .send({ error: "E-mail ou senha incorret1to(s)" });

    // Gera o JWT guardando o ID do usuário
    const accessToken = jwt.sign({ id: user.id }, config.jwtSecret);

    return response.status(201).send(accessToken);
  }
}
