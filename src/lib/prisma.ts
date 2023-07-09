import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

export async function db<T>(query: (prisma: PrismaClient) => Promise<T>): Promise<T | undefined> {
    try {
        const res = await query(prisma)
        await prisma.$disconnect
        return res
    } catch (e) {
        console.error(e)
        await prisma.$disconnect
    }
}
