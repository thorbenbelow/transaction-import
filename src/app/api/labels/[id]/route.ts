import {addLabelToTransaction, deleteLabel, getLabel} from "@/lib/labels";
import {NextResponse} from "next/server";

function getCurrentId(req: Request): number {
    const url = req.url.split('/')
    const id = url[url.length - 1]
    return parseInt(id)
}

export async function DELETE(req: Request) {
    const id = getCurrentId(req)
    await deleteLabel(id)
    return NextResponse.json({data: {}})
}

// {name, description, color, transactions: {add: [], remove: []}}
export async function PATCH(req: Request) {
    const id = getCurrentId(req)
    const changes = await req.json()

    for (const transactionId of changes.transactions.add) {
        console.log(transactionId, id)
        await addLabelToTransaction(id, parseInt(transactionId))
    }
    const label = await getLabel(id)
    return NextResponse.json({data: label})
}
