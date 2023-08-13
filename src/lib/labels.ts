import { db } from "@/lib/firestore";
import { Label } from "@prisma/client";


export function getLabels() {
    return db(prisma => prisma.label.findMany())
}

export function createLabel(label: Omit<Label, 'id'>) {
    return db(prisma => prisma.label.create({ data: label }))
}

export function addLabelToTransaction(labelId: number, transactionId: number) {
    return db(prisma => prisma.labeled.create({ data: { label_id: labelId, transaction_id: transactionId } }))
}

export async function deleteLabel(id: number): Promise<void> {
    await db(prisma => prisma.label.delete({ where: { id } }))
}

export async function getLabel(id: number): Promise<Label | undefined> {
    return db<Label>(prisma => prisma.label.findFirstOrThrow({ where: { id } }))
}
