import {db} from "../prisma";
import {Result, err, ok} from "neverthrow"
import {Label, Transaction} from "@prisma/client";

export async function getLabels() {
    return db(prisma => prisma.label.findMany())
}

export async function getLabelDetail(id: number): Promise<Result<{
    label: Label,
    transactions: Transaction[]
}, 'LabelNotFoundErr' | 'TransactionNotFoundErr'>> {
    const label = await db(prisma => prisma.label.findFirst({where: {id}}))
    if (!label) {
        return err('LabelNotFoundErr')
    }
    const labeled = await db(prisma => prisma.labeled.findMany({where: {label_id: id}})) || []

    let transactions: Transaction[] = [];
    for (const {transaction_id} of labeled) {
        const transaction = await db(prisma => prisma.transaction.findFirst({where: {id: transaction_id}}))
        if (!transaction) {
            return err('TransactionNotFoundErr')
        }
        transactions.push(transaction)
    }

    return ok({label, transactions})
}