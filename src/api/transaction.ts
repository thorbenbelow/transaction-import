import {Router} from "express";
import fileUpload, {UploadedFile} from "express-fileupload"
import {parseVbmCsv} from "../csv/parseVbmCsv";

const router = Router()

function isUploadedFile(file: UploadedFile | UploadedFile[] | undefined): file is UploadedFile {
  return !!file && "data" in file
}

router.post("/upload", fileUpload(), async (req, res) => {
  const csv = req?.files?.csv
  if (isUploadedFile(csv)) {
    const content = csv.data.toString()
    res.locals.csv = parseVbmCsv(content)
  }
  res.render('index', {transactions: res.locals.csv ?? []})
})

export default router
