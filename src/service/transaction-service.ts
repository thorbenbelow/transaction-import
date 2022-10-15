import {Labeled, Transaction} from "@prisma/client";
import {db} from "../prisma";

export async function getTransactions() {
    const transactions = await db(tx => tx.transaction.findMany({include: {Labeled: true}})) || []
    return Promise.all(transactions.map(async transaction => {
        const labels = await getLabels(transaction?.Labeled)
        return {...transaction, labels}
    }))
}

export async function getLabels(ids: Labeled[]): Promise<Awaited<unknown | undefined>[]> {
    return Promise
        .all(ids
            .map(l => l.label_id)
            .map(id => db(prisma => prisma
                .label
                .findFirst({where: {id}, select: {name: true}}))
            )
        )
}

export function addTransaction(data: Omit<Transaction, 'id'>) {
    const id = cyrb53(`${data.date}-${data.account}-${data.purpose}-${data.value}`)
    return db(prisma => prisma.transaction.create({data: {id, ...data}}))
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