import {Label, Labeled, Transaction} from "@prisma/client";
import {db} from "@/lib/prisma";

export async function createTransactions(transactions: Omit<Transaction, 'id'>[]) {
    await Promise.all(transactions.map(createTransaction))
}

function createTransaction(transaction: Omit<Transaction, 'id'>) {
    const id = cyrb53(`${transaction.date}-${transaction.account}-${transaction.purpose}-${transaction.value}`)
    return db(prisma => prisma.transaction.create({data: {id, ...transaction}}))
}

export async function getTransactions(): Promise<Transaction[]> {
    const transactions = await db<Transaction[]>(prisma => prisma.transaction.findMany({include: {Labeled: true}})) || []
    return Promise.all(transactions.map(async transaction => {
        const labels = await getLabelsFromLabeled(transaction?.Labeled)
        return {...transaction, labels: labels || []}
    }))
}

async function getLabelsFromLabeled(ids: Labeled[]): Promise<Label[]> {
    return Promise
        .all(ids
            .map(l => l.label_id)
            .map(id => db(prisma => prisma
                .label
                .findFirst({where: {id}, select: {name: true}}))
            )
        )
}


function cyrb53(str: string, seed = 0): number {
    let h1 = 0xdeadbeef ^ seed,
        h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }

    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);

    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}
