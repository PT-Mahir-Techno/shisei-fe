// schema.ts
import * as z from "zod";

export const promoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  code: z.string().min(1, "Code is required"),
  type_discount: z.enum(["percent", "price"]),
  discount: z.number().min(1, "Discount is required"),
  start_date: z.date().nullable(),
  end_date: z.date().nullable(),
  limit_per_member: z.string().nullable().optional(),
  kuota: z.string().nullable().optional(),
  type: z.enum(["member", "corporate"]),
  corporate_id: z.string().nullable().optional(),
});
