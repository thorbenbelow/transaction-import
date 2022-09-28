import express from 'express'
import transactionRouter from "./api/transaction"
import {db} from "./prisma";
import bodyParser from "body-parser";

const app = express()

app.use(express.static("public"))
app.use(bodyParser.json())
app.set('view engine', 'pug')

app.use('/t', transactionRouter)

app.get('/', async (req, res) => {
    const transactions = await db(tx => tx.transaction.findMany())
    res.render('index', {transactions})
})

export default app