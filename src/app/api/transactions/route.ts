import {Transaction} from "@prisma/client";
import {db} from "@/lib/prisma";
import {NextResponse} from "next/server";

export async function GET(req: Request) {
    const transactions = await getTransactions()
    return NextResponse.json({data: transactions})
}

export async function POST(req: Request) {
    const formData = await req.formData()
    const csv = formData.get('csv')
    console.log(csv)

}

async function getTransactions(): Promise<Transaction[]> {
    const transactions = await db<Transaction[]>(prisma => prisma.transaction.findMany({include: {Labeled: true}})) || []
    // return Promise.all(transactions.map(async transaction => {
    //     const labels = await getLabelsFromLabeled(transaction?.Labeled)
    //     return {...transaction, labels}
    // }))
    return transactions
}

//
// async function getLabelsFromLabeled(ids: Labeled[]): Promise<Label[]> {
//     return Promise
//         .all(ids
//             .map(l => l.label_id)
//             .map(id => db(prisma => prisma
//                 .label
//                 .findFirst({where: {id}, select: {name: true}}))
//             )
//         )
// }

