'use client'
import {Divider, InputBase, List, ListItem, ListItemText} from "@mui/material";
import Paper from "@mui/material/Paper";
import {useState} from "react";
import IconButton from "@mui/material/IconButton";
import {Add, Circle, ExpandLess, ExpandMore} from "@mui/icons-material";
import {Label} from "@prisma/client";

export default function LabelList(props: {
    labels: Label[]
}) {
    const {labels} = props;
    const [newLabel, setNewLabel] = useState<Omit<Label, 'id'>>({name: "", color: "", description: null})
    const [expanded, setExpanded] = useState(false)

    async function addNewLabel() {
        const res = await fetch('http://localhost:3000/api/labels', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newLabel)
        })
        const {data: label} = await res.json()
        labels.push(label)
        setNewLabel({name: "", color: "", description: null})
    }

    function expandLess() {
        setNewLabel({...newLabel, description: null})
        setExpanded(false)
    }

    function expandMore() {
        setExpanded(true)
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

                <Divider sx={{height: 28, m: 0.5}} orientation="vertical"></Divider>
                <IconButton color="primary">
                    {expanded ? <ExpandLess onClick={expandLess}></ExpandLess> :
                        <ExpandMore onClick={expandMore}></ExpandMore>}
                </IconButton>

            </Paper>

            {expanded && <Paper sx={{p: '2px 4px', display: 'flex', alignItems: 'center'}}> <InputBase
                placeholder="Add description..."
                onChange={evt => setNewLabel({...newLabel, description: evt.target.value})}></InputBase></Paper>}

            <List>
                {labels.map(label => <ListItem key={label.id}>
                    <IconButton component="label" sx={{color: label.color}}>
                        <Circle></Circle>
                    </IconButton>
                    <ListItemText primary={label.name} secondary={label.description}></ListItemText>
                </ListItem>)}
            </List>
        </Paper>
    )

}
