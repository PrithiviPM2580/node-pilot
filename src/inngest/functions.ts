import { NonRetriableError } from "inngest";
import { getExecutor } from "@/features/executions/lib/execuator-registry";
import type { NodeType } from "@/generated/prisma/enums";
import prisma from "@/lib/prisma-client";
import { topologicalSort } from "@/lib/utils";
import { inngest } from "./client";

export const executeWorkflow = inngest.createFunction(
  { id: "execute-workflow", triggers: { event: "workflows/execute.workflow" } },
  async ({ event, step }) => {
    const workflowId = event.data.workflowId;

    if (!workflowId) {
      throw new NonRetriableError("Workflow ID is required");
    }

    const sortedNodes = await step.run("prepare-workflow", async () => {
      const workflow = await prisma.workflow.findUniqueOrThrow({
        where: {
          id: workflowId,
        },
        include: {
          nodes: true,
          connections: true,
        },
      });

      return topologicalSort(workflow.nodes, workflow.connections);
    });

    let context = event.data.initialData || {};

    for (const node of sortedNodes) {
      const executor = getExecutor(node.type as NodeType);
      context = await executor({
        data: node.data as Record<string, unknown>,
        nodeId: node.id,
        context,
        step,
      });
    }

    return { sortedNodes };
  },
);
