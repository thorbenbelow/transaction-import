import { db } from "@/lib/firestore";

export async function getLabels() {
    return db(prisma => prisma.label.findMany())
}
