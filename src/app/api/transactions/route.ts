import {NextResponse} from "next/server";
import {createTransactions, getTransactions} from "@/lib/transactions";

export async function GET(req: Request) {
    const transactions = await getTransactions()
    return NextResponse.json({data: transactions})
}

export async function POST(req: Request) {
    const transactions = await req.json()
    await createTransactions(transactions)
    return NextResponse.json({data: transactions})
}



