import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // console.log(body)
    
    const res = await prisma.recipes.create({
        data: {
            userId: body.userId,
            name: body.name,
            image: body.image,
            title: body.title,
            ingredients: body.ingredients,
            steps: body.steps,
            picture: body.picture,
        }
    })

    return res
})