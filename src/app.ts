import express from 'express'
import transactionRouter from "./api/transaction"

const app = express()


app.set('view engine', 'pug')

app.use('/t', transactionRouter)

app.get('/', async (req, res) => {
    console.log("locals", res.locals.csv)
    const transactions = res.locals?.csv ?? []
    res.render('index', {transactions})
})

export default app