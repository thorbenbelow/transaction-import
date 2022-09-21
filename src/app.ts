import express from 'express'

const app = express()
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index', {transactions: ["sh", 'sdf', 'sadfgs']})
})

export default app