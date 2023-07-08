import {fetch} from "next/dist/compiled/@edge-runtime/primitives";
import TransactionList from "@/components/TransactionList";
import {getTransactions, Transaction} from '@/services/transaction-service'

export default async function Home() {

  const res = await getTransactions()
  console.log(res)
  const transactions = res.unwrapOr([])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <TransactionList transactions={transactions} />
    </main>
  )
}
