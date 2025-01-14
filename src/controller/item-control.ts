import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

interface RequestBody {
  title: string
}

const prisma = new PrismaClient()

const safeResponse = async (res: Response, callback: () => Promise<any>) => {
  try {
    const data = await callback()
    if (!res.headersSent) { res.json(data) }
  } catch (error) {
    console.error(error)
    if (!res.headersSent) {
      res.status(500).json({ error: 'Ocorreu um erro inesperado' })
    }
  }
}

const getItems = (req: Request, res: Response) => {
  safeResponse(res, async () => {
    return prisma.item.findMany()
  })
}

const addItem = (req: Request<{}, {}, RequestBody>, res: Response) => {
  safeResponse(res, async () => {
    const { title } = req.body

    await prisma.item.create({ data: { title } })

    return prisma.item.findMany()
  })
}

const updateItem = (req: Request, res: Response) => {
  safeResponse(res, async () => {
    const { updateId, title } = req.body

    await prisma.item.update({
      where: { id: updateId },
      data: { title },
    })

    return prisma.item.findMany()
  })
}

const deleteItem = (req: Request, res: Response) => {
  safeResponse(res, async () => {
    const { id } = req.params
    const itemId = parseInt(id, 10)

    await prisma.item.findUnique({ where: { id: itemId } });

    await prisma.item.delete({ where: { id: itemId } })

    return prisma.item.findMany();
  })
}

export { getItems, addItem, updateItem, deleteItem }
