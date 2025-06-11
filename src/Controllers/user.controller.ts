import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const crearUsuario = async (req: Request, res: Response) => {
  const { username, email, password, description } = req.body;
  try {
    const nuevoUsuario = await prisma.usuario.create({
      data: { username, email, password, description, isDeleted: false },
    });

    res.status(200).json({ data: nuevoUsuario });
  } catch (error) {
    res
      .status(400)
      .json({ error: "No se pudo crear el usuario. ¿Email duplicado?" });
  }
};

export const obtenerUsuarios = async (_req: Request, res: Response) => {
  const usuarios = await prisma.usuario.findMany({
    where: {
      isDeleted: false,
    },
    select: {
      id: true,
      username: true,
      email: true,
      description: true,
      password: true,
    },
  });
  res.status(200).json({ data: usuarios });
};

export const obtenerUsuarioPorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id },
    });
    if (!usuario)
      return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: "ID inválido" });
  }
};

export const actualizarUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, email, password, description } = req.body;
  try {
    const usuarioActualizado = await prisma.usuario.update({
      where: { id },
      data: { username, email, password, description },
    });
    res.status(200).json({data: usuarioActualizado});
  } catch (error) {
    res.status(400).json({ error: "No se pudo actualizar el usuario" });
  }
};

export const eliminarUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.usuario.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });
    res.status(200).json({
      message: "Usuario eliminado con exito",
    });
  } catch (error) {
    res.status(400).json({ error: "No se pudo eliminar el usuario" });
  }
};
