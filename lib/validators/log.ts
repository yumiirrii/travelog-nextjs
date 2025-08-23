import { z } from "zod";

export const LogSchema = z.object({
    // id: z.number(),
    date: z.string(),
    category: z.number(),
    spot: z.string(),
    note: z.string(),
    expense: z.string(),
    travel_id: z.number(),
});

// export const DetailFormSchema = LogSchema.omit({ id: true });

// export type DetailForm = z.infer<typeof DetailFormSchema>;
export const CreateLogSchema = LogSchema;
export const UpdateLogSchema = LogSchema.extend({ id: z.number() });

export type CreateDetailForm = z.infer<typeof CreateLogSchema>;
export type UpdateDetailForm = z.infer<typeof UpdateLogSchema>;
