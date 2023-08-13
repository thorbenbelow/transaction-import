import { NextResponse } from "next/server";
import { createLabel, getLabels } from "@/lib/labels";


export async function POST(req: Request) {
    const { name, description, color } = await req.json()
    const label = await createLabel({ name, color, description })
    return NextResponse.json({ data: label })
}

export async function GET(req: Request) {
    const labels = await getLabels();
    return NextResponse.json({ data: labels })
}
