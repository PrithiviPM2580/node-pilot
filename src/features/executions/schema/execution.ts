import { z } from "zod";

export const httpRequestFormSchema = z.object({
  endpoint: z.url("Please enter a valid URL"),
  method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
  body: z.string().optional(),
});

export type HTTPRequestFormSchema = z.infer<typeof httpRequestFormSchema>;
