import {getJson, patchJson, postJson} from "@/lib/fetch";

export type LabelDto = {
    id: number,
    name: string,
    description?: string,
    color: string
}

export type TransactionDto = {
    id: number
    date: string,
    account: string,
    purpose: string | null,
    value: number
}

export type TransactionWithLabelIdsDto = TransactionDto & {
    labels: number[]
}

type LabelChangesDto =
    Partial<LabelDto> & {
    transactions?: { add?: number[], remove?: number[] }
    id: number
}

export const api = {
    transactions: {
        get: (): Promise<TransactionWithLabelIdsDto[]> => getJson('/transactions'),
        post: (transactions: Omit<TransactionDto, 'id'>[]): Promise<TransactionDto[]> => postJson('/transactions', transactions)
    },
    labels: {
        get: (): Promise<LabelDto[]> => getJson('/labels'),
        post: (label: Omit<LabelDto, 'id'>): Promise<LabelDto> => postJson('/labels', label),
        labelId: {
            patch: (changes: LabelChangesDto) => patchJson(`/labels/${changes.id}`, changes)
        }
    }
}
