import { Router } from "express";
import {getTransactions} from "../service/transaction-service";

const router = Router()

router.get("/", async (req, res) => {
    const transactions = await getTransactions()
    res.send(transactions)
})

export default router