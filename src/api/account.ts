import {Router} from "express";
import {db} from "../prisma";

const router = Router()


router.post('/new', async (req, res) => {
    const account = await db(async (prisma) =>
        prisma.account.create({
            data: {
                name: "test22"
            }
        })
    )
})