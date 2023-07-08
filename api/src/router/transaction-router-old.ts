import {Router} from "express";
import {db} from "../prisma";
import {getLabels, getTransactions} from "../service/transaction-service";
import {routes} from "./routes";


export const router = Router()

const uploadRoute = `${routes.Transaction}/upload`


router.get('/', async (req, res) => {
    const transactions = await getTransactions();
    res.render('transaction_list', {ctx: res.locals.ctx, transactions, uploadRoute})
})

router.post("/:id/label", async (req, res) => {
    const labelName = req.body.label
    const transactionId = parseInt(req.params.id)
    await db(async prisma => {
        const label = await prisma.label.upsert({
            create: {name: labelName},
            update: {name: labelName},
            where: {name: labelName}
        })
        const data = {label_id: label.id, transaction_id: transactionId};
        return prisma.labeled.upsert({create: data, where: {transaction_id_label_id: data}, update: {}})
    })
    res.redirect(`/t/${transactionId}`)
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const transaction = await db(prisma => prisma.transaction.findFirst({
        where: {id},
        include: {Labeled: true}
    }))
    const labels = await getLabels(transaction?.Labeled!)
    res.render("transaction_detail", {...transaction, labels})
})

export default router