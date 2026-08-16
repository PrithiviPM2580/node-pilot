import { z } from "zod";
import { PAGINATION } from "@/utils/constants";

export const workflowParamsSchema = z.object({
  id: z.string("Invalid workflow id"),
});

export const updateWorkflowSchema = z.object({
  id: z.string("Invalid workflow id"),
  name: z
    .string("Invalid workflow name")
    .min(1, "Workflow name cannot be empty"),
});

export const getManyWorkflowsSchema = z.object({
  page: z.number().default(PAGINATION.DEFAULT_PAGE),
  pageSize: z
    .number()
    .min(PAGINATION.MIN_PAGE_SIZE)
    .max(PAGINATION.MAX_PAGE_SIZE)
    .default(PAGINATION.DEFAULT_PAGE_SIZE),
  search: z.string().default(""),
});

export type WorkflowParams = z.infer<typeof workflowParamsSchema>;
export type UpdateWorkflowInput = z.infer<typeof updateWorkflowSchema>;
export type GetManyWorkflowsInput = z.infer<typeof getManyWorkflowsSchema>;
