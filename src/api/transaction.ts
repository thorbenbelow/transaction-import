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
  res.render('index', {transactions: res.locals.csv ?? []})
})

export default router
