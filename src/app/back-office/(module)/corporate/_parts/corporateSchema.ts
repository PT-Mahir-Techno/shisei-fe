import * as z from "zod";

export const corporateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  whitelist_email: z.string().min(1, "Name is required")
});
