import {fetch} from "next/dist/compiled/@edge-runtime/primitives";
import {Transaction} from '../../../api/src/dtos'
import TransactionList from "@/components/TransactionList";

export default async function Home() {

  const res = await fetch('http://localhost:3000/api/transactions')
  const transactions = await res.json() as Transaction[]

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TransactionList transactions={transactions} />
    </main>
  )
}
