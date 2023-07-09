import {fetch} from "next/dist/compiled/@edge-runtime/primitives";
import TransactionList from "@/components/TransactionList";
import {getTransactions, Transaction} from '@/services/transaction-service'

export default async function Home() {

  const res = await getTransactions()
  const transactions = res.unwrapOr([])

  return (
    <main className="flex flex-col items-center justify-between pt-6 px-6">
      <TransactionList transactions={transactions} />
    </main>
  )
}
