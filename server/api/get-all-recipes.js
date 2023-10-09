import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    let recipes = await prisma.recipes.findMany({
        orderBy: { id: "desc" },
        include: { cheers: true }
    })
    return recipes
})