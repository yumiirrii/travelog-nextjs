// lib/db.ts
import postgres from "postgres";
import { BasicForm, Travel, TravelSchema } from "./validators/travel";
import { z } from "zod";
import {
    CreateDetailForm,
    UpdateDetailForm,
    UpdateLogSchema,
} from "./validators/log";

const sql = postgres(process.env.DATABASE_URL!, {
    ssl: "require",
});

// travel全取得
export async function fetchTravels() {
    try {
        const rows = await sql`
        SELECT * FROM travel ORDER BY date_start DESC
        `;
        return z.array(TravelSchema).parse(rows);
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
}

// travel取得
export async function fetchTravelById(id: number) {
    try {
        const rows = await sql`SELECT * FROM travel WHERE id=${id}`;
        return TravelSchema.parse(rows[0]);
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
}

// travel登録
export async function insertTravel(form: BasicForm) {
    try {
        const result =
            await sql`INSERT INTO travel (date_start, date_end, destination)
        VALUES (${form.date_start}, ${form.date_end}, ${form.destination}) RETURNING id`;
        const id = result[0]?.id;
        return id;
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
}

// travel更新
export async function updateTravel(id: number, form: Travel) {
    try {
        await sql`UPDATE travel SET date_start=${form.date_start}, date_end=${form.date_end}, destination=${form.destination}
        WHERE id=${id}`;
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
}

// travel削除
export async function deleteTravel(id: number) {
    try {
        const logCount =
            await sql`SELECT COUNT(*) FROM log WHERE travel_id=${id}`;
        if (logCount[0].count !== "0") {
            // logにデータがある場合は削除しない
            return;
        } else {
            await sql`DELETE FROM travel WHERE id=${id}`;
        }
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
}

// travel検索
export async function fetchTravelBySearchCon(
    date_start: string,
    date_end: string,
    destination: string
) {
    try {
        const rows =
            await sql`SELECT * FROM travel WHERE (${date_end} = '' OR date_start <= ${date_end}) AND (${date_start} = '' OR date_end >= ${date_start}) AND (${destination} = '' OR destination LIKE ${
                destination + "%"
            }) ORDER BY date_start DESC`;
        return z.array(TravelSchema).parse(rows);
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
}

// log取得
export async function fetchLogsByTravelId(travelId: number) {
    try {
        const rows = await sql`
        SELECT * FROM log WHERE travel_id=${travelId} ORDER BY id
        `;
        return z.array(UpdateLogSchema).parse(rows);
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
}

// log登録
export async function insertLog(form: CreateDetailForm) {
    try {
        await sql`INSERT INTO log (date, category, spot, note, expense, travel_id)
        VALUES (${form.date}, ${form.category}, ${form.spot}, ${form.note}, ${form.expense}, ${form.travel_id})`;
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
}

// log更新
export async function updateLog(id: number, form: UpdateDetailForm) {
    try {
        await sql`UPDATE log SET date=${form.date}, category=${form.category}, spot=${form.spot}, note=${form.note}, expense=${form.expense}, travel_id=${form.travel_id}
        WHERE id=${id}`;
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
}

// log削除
export async function deleteLog(id: number) {
    try {
        await sql`DELETE FROM log WHERE id=${id}`;
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }
}
