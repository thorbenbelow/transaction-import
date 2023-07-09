import TransactionList from "@/components/TransactionList";
import LabelList from "@/components/LabelList";
import {fetch} from "next/dist/compiled/@edge-runtime/primitives";

export default async function Home() {

    const tRes = await fetch("http://localhost:3000/api/transactions")
    const transactions = await tRes.json()

    const lRes = await fetch("http://localhost:3000/api/labels")
    const labels = await lRes.json()

    return (
        <main className="flex pt-6 px-6 gap-1">
            <TransactionList transactions={transactions.data}/>
            <LabelList labels={labels.data}/>
        </main>
    )
}
