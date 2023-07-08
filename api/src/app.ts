import express from 'express'
import transactionRouterOld from "./router/transaction-router-old"
import transactionRouter from "./router/transaction-router";
import labelRouter from "./router/label-router";
import bodyParser from "body-parser";
import {routes} from "./router/routes";
import morgan from "morgan"

const app = express()

app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan("tiny"))
app.set('view engine', 'pug')

app.use(function (req, res, next) {
    res.locals.ctx = {
        routes
    }
    next()
})

const apiRouter = express.Router()
apiRouter.use(routes.Transaction, transactionRouter)

app.use('/api', apiRouter)

app.use(routes.Transaction, transactionRouterOld)
app.use(routes.Label, labelRouter)

app.get('/', async (req, res) => {
    res.redirect(routes.Transaction)
})

export default app