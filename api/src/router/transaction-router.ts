import { Router } from "express";
import {addTransaction, getTransactions} from "../service/transaction-service";
import fileUpload, {UploadedFile} from "express-fileupload"
import { parseVbmCsv } from "../csv/parseVbmCsv";


const router = Router()

router.get("/", async (req, res) => {
    const transactions = await getTransactions()
    res.send(transactions)
})

function isUploadedFile(file: UploadedFile | UploadedFile[] | undefined): file is UploadedFile {
    return !!file && "data" in file
}

router.post("/", fileUpload(), async (req, res) => {
    const csv = req?.files?.csv
    console.log(csv)
    if (isUploadedFile(csv)) {
        const content = csv.data.toString()
        const data = parseVbmCsv(content)
        await Promise.all(data.map(t => addTransaction(t)))
        res.locals.csv = data
    }
    const transactions = await getTransactions()
    res.send(transactions)
})

export default router