export type Account = {
  id: string
  name: string,
}

export type Transaction = {
  id: string,
  date: string,
  from: string,
  to: string,
  purpose: string
  value: number
}

export type Label = {
  id: string,
  name: string,
  color: string,
  description: string
}

export type Labeled = {
  id: number,
  label_id: number,
  transaction_id: number
}

