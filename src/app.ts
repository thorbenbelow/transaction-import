import express from 'express'
import transactionRouter from "./router/transaction-router"
import {db} from "./prisma";
import bodyParser from "body-parser";

const app = express()

app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'pug')

app.use('/t', transactionRouter)

app.get('/', async (req, res) => {
    const transactions = await db(tx => tx.transaction.findMany()) || []
    res.render('transaction_list', {transactions})
})

export default app