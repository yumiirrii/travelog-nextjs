import { fetchTravelById } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const id = Number(req.url.split("/").pop());
    if (!id) {
        return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    try {
        const travel = await fetchTravelById(id);
        return NextResponse.json(travel);
    } catch (error) {
        return NextResponse.json(
            { error: "fetch DB error" + error },
            { status: 500 }
        );
    }
}
