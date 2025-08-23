import { z } from "zod";

// // DBから取得するカラム名、型はクライアントで使用する型
// export const DbTravelSchema = z.object({
//     id: z.number(),
//     date_start: z.string(),
//     date_end: z.string(),
//     destination: z.string(),
// });

// // クライアント向けのプロパティ名に変換
// export const TravelSchema = DbTravelSchema.transform((data) => ({
//     id: data.id,
//     dateStart: data.date_start,
//     dateEnd: data.date_end,
//     destination: data.destination,
// }));

// export type Travel = z.infer<typeof TravelSchema>;

export const TravelSchema = z.object({
    id: z.number(),
    date_start: z.string(),
    date_end: z.string(),
    destination: z.string(),
});

export const BasicFormSchema = TravelSchema.omit({ id: true });
export type BasicForm = z.infer<typeof BasicFormSchema>;
export type Travel = z.infer<typeof TravelSchema>;
