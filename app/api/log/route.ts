import { deleteLog, fetchLogsByTravelId, insertLog, updateLog } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const travelId = req.nextUrl.searchParams.get("travel_id");
    if (!travelId || isNaN(Number(travelId))) {
        return NextResponse.json(
            { error: "Missing travel id" },
            { status: 400 }
        );
    }
    try {
        const logs = await fetchLogsByTravelId(Number(travelId));
        return NextResponse.json(logs);
    } catch (error) {
        return NextResponse.json(
            { error: "fetch DB error" + error },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const form = await req.json();
        await insertLog(form);
        return NextResponse.json({
            message: "Log inserted successfully",
        });
    } catch (error) {
        return NextResponse.json(
            { error: "insert DB error" + error },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest) {
    try {
        const form = await req.json();
        await updateLog(form.id, form);
        return NextResponse.json({
            message: "Log updated successfully",
        });
    } catch (error) {
        return NextResponse.json(
            { error: "insert DB error" + error },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const form = await req.json();
        await deleteLog(form.id);
        return NextResponse.json({
            message: "Log deleted successfully",
        });
    } catch (error) {
        return NextResponse.json(
            { error: "delete DB error" + error },
            { status: 500 }
        );
    }
}
