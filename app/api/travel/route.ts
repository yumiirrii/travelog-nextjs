import {
    deleteTravel,
    fetchTravels,
    insertTravel,
    updateTravel,
} from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const travels = await fetchTravels();
        return NextResponse.json(travels);
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
        const insertedId = await insertTravel(form);
        return NextResponse.json({
            message: "Travel inserted successfully",
            id: insertedId,
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
        console.log(form);
        await updateTravel(form.id, form);
        return NextResponse.json({
            message: "Travel updated successfully",
        });
    } catch (error) {
        return NextResponse.json(
            { error: "update DB error" + error },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const form = await req.json();
        await deleteTravel(form.id);
        return NextResponse.json({
            message: "Travel deleted successfully",
        });
    } catch (error) {
        return NextResponse.json(
            { error: "delete DB error" + error },
            { status: 500 }
        );
    }
}
