import {postCsvTranscations} from "@/services/transaction-service";
import React from "react";

export default function FileUpload() {
    const upload = async (evt: React.ChangeEvent<HTMLInputElement>) => evt.target.files && postCsvTranscations(evt.target.files)
    return <input type="file" onChange={upload}/>
}