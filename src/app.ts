import express from 'express'
import transactionRouter from "./router/transaction-router"
import labelRouter from "./router/label-router";
import bodyParser from "body-parser";
import {getTransactions} from "./service/transaction-service";

const app = express()

app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'pug')

app.use('/t', transactionRouter)
app.use('/label', labelRouter)

app.get('/', async (req, res) => {
    const transactions = await getTransactions();
    res.render('transaction_list', {transactions})
})

export default app