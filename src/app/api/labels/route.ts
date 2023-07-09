import {NextResponse} from "next/server";
import {Label} from "@prisma/client";
import {db} from "@/lib/prisma";

export async function POST(request: Request) {
    const {name, description, color} = await request.json()
    const label = await createLabel({name, color, description})
    return NextResponse.json({data: label})
}

export async function GET(request: Request) {
    const labels = await getLabels();
    return NextResponse.json({data: labels})
}

function getLabels() {
    return db(prisma => prisma.label.findMany())
}

function createLabel(label: Omit<Label, 'id'>) {
    return db(prisma => prisma.label.create({data: label}))
}

