import * as z from "zod";

export const corporateSchema = z.object({
  name: z.string().min(1, "Name is required")
});
