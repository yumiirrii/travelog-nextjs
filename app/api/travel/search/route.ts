import { fetchTravelBySearchCon } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const date_start = req.nextUrl.searchParams.get("date_start") ?? "";
    const date_end = req.nextUrl.searchParams.get("date_end") ?? "";
    const destination = req.nextUrl.searchParams.get("destination") ?? "";
    try {
        const logs = await fetchTravelBySearchCon(
            date_start,
            date_end,
            destination
        );
        return NextResponse.json(logs);
    } catch (error) {
        return NextResponse.json(
            { error: "fetch DB error" + error },
            { status: 500 }
        );
    }
}
