import { Label } from "./dtos";
import db from "./firestore"
import { v4 as uuidv4 } from 'uuid';

const labels = db.collection("labels")
const labeled = db.collection("labeled")

export async function getLabels(): Promise<Label[]> {
    const collection = await labels.get()
    const res: Label[] = []
    collection.forEach(label => res.push(label.data() as Label))
    return res
}


export function createLabel(label: Omit<Label, 'id'>) {
    const uid = uuidv4()
    return labels.doc(uid).set(label)
}

export function addLabelToTransaction(labelId: number, transactionId: number) {
    return labeled.add({ labelId, transactionId })
}

export async function deleteLabel(id: number): Promise<void> {
    //  await db(prisma => prisma.label.delete({ where: { id } }))
}

export async function getLabel(uid: string): Promise<Label | undefined> {
    const doc = await labels.doc(uid).get()
    return doc.exists ? doc.data() as Label : undefined
}
