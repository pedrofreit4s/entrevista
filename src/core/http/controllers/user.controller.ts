import { Request, Response } from "express";
import { prisma } from "../../database/connection";
import bcrypt from "bcryptjs";

/**
 * User Controller
 * @class UserController
 */
export class UserController {
  /**
   * Lista todos os usuários cadastrados
   * @param request
   * @param response
   * @returns
   */
  async findAll(request: Request, response: Response) {
    const users = await prisma.user.findMany();

    return response.send(users);
  }

  /**
   * Retorna os dados do usuário logado
   * @param request
   * @param response
   * @returns
   */
  async me(request: Request, response: Response) {
    const user = await prisma.user.findUnique({
      where: {
        id: request.userId,
      },
    });

    return response.send(user);
  }

  /**
   * Deletar um usuário pelo ID
   * @param request
   * @param response
   * @returns
   */
  async delete(request: Request, response: Response) {
    try {
      const id = request.params.id;

      const user = await prisma.user.delete({
        where: {
          id,
        },
      });
      if (!user) return response.status(400).send("Usuário não encontrado!");

      return response.send(user);
    } catch (error) {
      response.status(400).send("Usuário não encontrado!");
    }
  }

  /**
   * Atualiza um usuário pelo ID
   * @param request
   * @param response
   * @returns
   */
  async update(request: Request, response: Response) {
    const { name, email, password } = request.body;
    const user = await prisma.user.findUnique({
      where: {
        id: request.params.id,
      },
    });
    if (!user) return response.status(400).send("Usuário não encontrado!");

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name,
        email,
        password: bcrypt.hashSync(password || user.password, 7),
      },
    });

    return response.send(user);
  }
}
