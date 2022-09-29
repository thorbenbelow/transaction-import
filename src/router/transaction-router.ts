import {Router} from "express";
import fileUpload, {UploadedFile} from "express-fileupload"
import {parseVbmCsv} from "../csv/parseVbmCsv";
import {db} from "../prisma";

const router = Router()

function isUploadedFile(file: UploadedFile | UploadedFile[] | undefined): file is UploadedFile {
    return !!file && "data" in file
}

router.post("/upload", fileUpload(), async (req, res) => {
    const csv = req?.files?.csv
    if (isUploadedFile(csv)) {
        const content = csv.data.toString()
        const data = parseVbmCsv(content)
        await Promise.all(data.map(t => db(prisma => prisma.transaction.create({data: t}))))
        res.locals.csv = data
    }
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
        // todo combination should be unique
        return prisma.labeled.create({data: {label_id: label.id, transaction_id: transactionId}})
    })
    res.redirect(`/t/${transactionId}`)
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const transaction = await db(prisma => prisma.transaction.findFirst({
        where: {id},
        include: {Labeled: {select: {label_id: true}}}
    }))
    const labels = await Promise.all(
        (transaction?.Labeled as any[]).map(labeled =>
            db(prisma => prisma.label.findFirst({where: {id: labeled.label_id}, select: {name: true}}))
        )
    )
    res.render("transaction_detail", {...transaction, labels})
})

export default router
