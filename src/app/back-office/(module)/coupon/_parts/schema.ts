// schema.ts
import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  code: z.string().min(1, "Code is required"),
  type_discount: z.string().min(1, "Type discount is required"),
  discount: z.number().min(1, "Discount is required"),
  start_date: z.any(),
  end_date: z.any(),
  limit_per_member: z.number().nullable().optional(),
  kuota: z.number().nullable().optional(),
  type: z.string().min(1, "Type is required"),
  corporate_id: z.string().nullable().optional(),
});
