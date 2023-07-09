import {postCsvTranscations} from "@/services/transaction-service";
import React from "react";
import IconButton from "@mui/material/IconButton";
import {Upload} from "@mui/icons-material";

export default function FileUpload() {
    const upload = async (evt: React.ChangeEvent<HTMLInputElement>) => evt.target.files && postCsvTranscations(evt.target.files)

    return (
        <IconButton aria-label="upload" component="label">
            <Upload/>
            <input hidden type="file" onChange={upload}/>
        </IconButton>
    )
}
