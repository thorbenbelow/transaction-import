import {err, ok, Result} from 'neverthrow'
export type Transaction = {
    id: number,
    date: string,
    account: string,
    purpose: string,
    value: string
}

export type ServerErr = 'ServerErr'
export async function getTransactions(): Promise<Result<Transaction[], ServerErr>> {
    const res = await fetch('http://localhost:3000/api/transactions')
    
    if(res.status !== 200) {
        return err('ServerErr')    
    }
    try {
        const transactions = await res.json() as Transaction[]
        return ok(transactions)
    }catch (e) {
        return err('ServerErr')    
    }
}
