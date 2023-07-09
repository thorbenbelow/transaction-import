import {db} from "@/lib/prisma";

export async function getLabels() {
    return db(prisma => prisma.label.findMany())
}
