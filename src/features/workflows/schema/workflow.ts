import { z } from "zod";
import { PAGINATION } from "@/utils/constants";

export const workflowParamsSchema = z.object({
  id: z.string("Invalid workflow id"),
});

export const updateNameWorkflowSchema = z.object({
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

export const updateWorkflowSchema = z.object({
  id: z.string("Invalid workflow id"),
  nodes: z.array(
    z.object({
      id: z.string("Invalid node id"),
      type: z.string("Invalid node type").nullish(),
      position: z.object({
        x: z.number("Invalid x coordinate"),
        y: z.number("Invalid y coordinate"),
      }),
      data: z.record(z.string(), z.any()).optional(),
    }),
  ),
  edges: z.array(
    z.object({
      source: z.string("Invalid source node id"),
      target: z.string("Invalid target node id"),
      sourceHandle: z.string("Invalid source handle").nullish(),
      targetHandle: z.string("Invalid target handle").nullish(),
    }),
  ),
});

export type WorkflowParams = z.infer<typeof workflowParamsSchema>;
export type UpdateWorkflowInput = z.infer<typeof updateNameWorkflowSchema>;
export type GetManyWorkflowsInput = z.infer<typeof getManyWorkflowsSchema>;
