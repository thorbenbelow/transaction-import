import React from "react";
import IconButton from "@mui/material/IconButton";
import {Upload} from "@mui/icons-material";
import {api} from "@/lib/api";

export default function FileUpload() {
    const upload = async (evt: React.ChangeEvent<HTMLInputElement>) => evt.target.files && postCsvTranscations(evt.target.files)

    return (
        <IconButton aria-label="upload" component="label">
            <Upload/>
            <input hidden type="file" onChange={upload}/>
        </IconButton>
    )
}

async function postCsvTranscations(files: FileList) {
    const file = files.item(0)
    if (!file) {
        return
    }
    const content = await file.text()
    const transactions = parseVbmCsv(content)
    return api.transactions.post(transactions)
}

function parseVbmCsv(content: string) {
    const lines = content.split("\n")
    return lines
        .map(line => line.split(";"))
        .filter((line, idx) => line.length == 19 && idx !== 0)
        .map(f => {
            const [day, month, year] = f[4].split('.').map(s => parseInt(s))
            return {
                date: new Date(year, month, day).toString(),
                account: f[6],
                purpose: f[10],
                value: parseInt(f[11].replace(',', ""))
            }
        })
}
