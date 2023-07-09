import {Label} from "@prisma/client";
import {db} from "@/lib/prisma";
import {NextResponse} from "next/server";


export async function POST(req: Request) {
    const {name, description, color} = await req.json()
    const label = await createLabel({name, color, description})
    return NextResponse.json({data: label})
}

export async function GET(req: Request) {
    const labels = await getLabels();
    return NextResponse.json({data: labels})
}

function getLabels() {
    return db(prisma => prisma.label.findMany())
}

function createLabel(label: Omit<Label, 'id'>) {
    return db(prisma => prisma.label.create({data: label}))
}

