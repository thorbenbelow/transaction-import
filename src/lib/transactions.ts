import { TransactionWithLabelIdsDto } from "@/lib/api";
import { Transaction } from './dtos'
import db from './firestore'
import { v4 as uuid } from 'uuid'

export async function createTransactions(transactions: Omit<Transaction, 'id'>[]) {
    await Promise.all(transactions.map(createTransaction))
}

const transactions = db.collection('/transactions')

function createTransaction(transaction: Omit<Transaction, 'id'>) {
    const uid = uuid()
    return transactions.doc(uid).set(transaction)

}

export async function getTransactions(): Promise<TransactionWithLabelIdsDto[]> {
    const collection = await transactions.get()
    const res: TransactionWithLabelIdsDto[] = []
    collection.forEach(transaction => res.push({ ...transaction.data(), labels: [] } as unknown as TransactionWithLabelIdsDto))
    return res
}