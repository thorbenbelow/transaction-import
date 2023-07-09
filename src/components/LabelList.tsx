'use client'
import {InputBase, List, ListItem, ListItemText} from "@mui/material";
import Paper from "@mui/material/Paper";
import {useState} from "react";
import IconButton from "@mui/material/IconButton";
import {Add, Circle} from "@mui/icons-material";
import {Label} from "@prisma/client";

export default function LabelList(props: {
    labels: Label[]
}) {
    const {labels} = props;
    const [newLabel, setNewLabel] = useState({name: "", color: ""})

    async function addNewLabel() {
        const res = await fetch('http://localhost:3000/api/labels', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newLabel)
        })
        const {data: label} = await res.json()
        labels.push(label)
        setNewLabel({name: "", color: ""})
    }

    return (
        <Paper sx={{minWidth: "240px"}}>
            <Paper
                sx={{p: '2px 4px', display: 'flex', alignItems: 'center'}}>
                <IconButton component="label" sx={{color: newLabel.color}}>
                    <Circle></Circle>
                    <input hidden type="color" onChange={evt => setNewLabel({...newLabel, color: evt.target.value})}/>
                </IconButton>
                <InputBase placeholder="Create new label"
                           onChange={evt => setNewLabel({...newLabel, name: evt.target.value})}></InputBase>
                <IconButton onClick={addNewLabel}>
                    <Add></Add>
                </IconButton>
            </Paper>

            <List>
                {labels.map(label => <ListItem key={label.id}>
                    <IconButton component="label" sx={{color: label.color}}>
                        <Circle></Circle>
                    </IconButton>
                    <ListItemText primary={label.name}></ListItemText>
                </ListItem>)}
            </List>
        </Paper>
    )

}
