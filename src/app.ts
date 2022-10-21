import express from 'express'
import transactionRouter from "./router/transaction-router"
import labelRouter from "./router/label-router";
import bodyParser from "body-parser";
import {Route} from "./router/routes";
import morgan from "morgan"

const app = express()

app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan("tiny"))
app.set('view engine', 'pug')


app.use(Route.Transaction, transactionRouter)
app.use(Route.Label, labelRouter)

app.get('/', async (req, res) => {
    res.redirect(Route.Transaction)
})

export default app