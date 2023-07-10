'use client'
import {Autocomplete, TextField} from "@mui/material";
import {api, LabelDto, TransactionDto} from "@/lib/api";
import {useState} from "react";

interface LabelInputProps {
    labels: Pick<LabelDto, 'id' | 'name'>[],
    transaction: TransactionDto
}

export default function LabelInput(props: LabelInputProps) {
    const {labels, transaction} = props
    const [value, setValue] = useState<{ label: string, id: number } | null>(null)

    async function handleChange(evt: any, value: { label: string, id: number } | null) {
        setValue(value)
        if (value) {
            await api.labels.labelId.patch({id: value.id, transactions: {add: [transaction.id]}})
        }
    }

    return (
        <Autocomplete
            disablePortal
            options={labels.map(l => ({label: l.name, id: l.id}))}
            sx={{width: 300}}
            onChange={handleChange}
            value={value}
            renderInput={(params) => <TextField {...params} label="Add label.."/>}
        />
    )
}
