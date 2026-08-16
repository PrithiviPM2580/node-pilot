import { z } from "zod";

export const workflowParamsSchema = z.object({
  id: z.string("Invalid workflow id"),
});

export const updateWorkflowSchema = z.object({
  id: z.string("Invalid workflow id"),
  name: z
    .string("Invalid workflow name")
    .min(1, "Workflow name cannot be empty"),
});

export type WorkflowParams = z.infer<typeof workflowParamsSchema>;
export type UpdateWorkflowInput = z.infer<typeof updateWorkflowSchema>;
