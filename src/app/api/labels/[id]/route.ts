import {db} from "@/lib/prisma";
import {NextResponse} from "next/server";

export async function DELETE(req: Request) {
    const url = req.url.split('/')
    const id = url[url.length - 1]
    console.log(id)
    await deleteLabel(parseInt(id as string))
    return NextResponse.json({data: {}})
}

async function deleteLabel(id: number): Promise<void> {
    await db(prisma => prisma.label.delete({where: {id}}))
}
