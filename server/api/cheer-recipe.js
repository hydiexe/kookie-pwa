import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
        
    const res = await prisma.cheers.create({
        data: {
            userId: body.userId,
            recipeId: body.recipeId,
        }
    })

    return res
})
