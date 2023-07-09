import {err, ok, ResultAsync} from 'neverthrow'

export type Transaction = {
    id: number,
    date: string,
    account: string,
    purpose: string,
    value: number
}

export type Label = {
    id: number,
    name: string,
    description?: string,
    color: string
}

enum Err {
    JsonParseErr = 'JsonParseErr',
    NetworkErr = 'NetworkErr',
    ServerErr = 'ServerErr'
}

const safeJsonParse = (res: Response) => ResultAsync.fromPromise(res.json(), () => Err.JsonParseErr)
const apiUrl = 'http://localhost:3000/api/'

function safeFetch(url: string, options?: RequestInit): ResultAsync<Response, Err> {
    const res = ResultAsync.fromPromise(fetch(`${apiUrl}${url}`, options), () => Err.NetworkErr);
    return res.andThen(res => {
        if (res.status !== 200) {
            return err(Err.ServerErr)
        }
        return ok(res)
    })
}

function safeFetchJson<T>(url: string): ResultAsync<T, Err> {
    return safeFetch(url).andThen(safeJsonParse)
}

export function getTransactions(): ResultAsync<{
    data: Transaction[]
}, Err> {
    return safeFetchJson('transactions')
}

export function getLabels(): ResultAsync<{
    data: Label[]
}, Err> {
    return safeFetchJson('labels')
}

export function addLabel(label: Omit<Label, "id">): ResultAsync<Label, Err> {
    console.log("SENDING", JSON.stringify(label))
    return safeFetch('labels', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(label)
    }).andThen(safeJsonParse)
}

export function postCsvTranscations(file: FileList): ResultAsync<null, Err> {
    const formData = new FormData()
    formData.append('csv', file[0], file[0].name)
    return safeFetch('transactions', {method: 'POST', body: formData}).map(() => null)
}
