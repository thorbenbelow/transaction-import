import {db} from "../prisma";

export async function getLabels() {
    return db(prisma => prisma.label.findMany())
}