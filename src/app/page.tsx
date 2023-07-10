import TransactionList from "@/components/TransactionList";
import LabelList from "@/components/LabelList";
import {api, LabelDto} from "@/lib/api";

export default async function Home() {

    const transactions = await api.transactions.get()
    const labels = await api.labels.get()

    const mapToLabelDtos = (ids: number[]): LabelDto[] => {
        const dtos: LabelDto[] = []
        for (const id of ids) {
            const label = labels.find(l => l.id === id)
            if (label) {
                dtos.push(label)
            }
        }
        return dtos
    }

    const transactionsWithLabels = transactions.map(t => ({
        ...t,
        labels: mapToLabelDtos(t.labels)
    }))


    return (
        <main className="flex pt-6 px-6 gap-1">
            <TransactionList transactions={transactionsWithLabels} labels={labels}/>
            <LabelList labels={labels}/>
        </main>
    )
}
