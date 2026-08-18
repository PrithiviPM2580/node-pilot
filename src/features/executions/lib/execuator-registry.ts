import { manualTriggerExecutor } from "@/features/triggers/components/manual-trigger/executor";
import { NodeType } from "@/generated/prisma/enums";
import { httpRequestExecutor } from "../components/http-request/executor";
import type { NodeExecutor } from "../types";

export const execuatorRegistry: Record<NodeType, NodeExecutor> = {
  [NodeType.INITIAL]: manualTriggerExecutor,
  [NodeType.MANUAL_TRIGGER]: manualTriggerExecutor,
  [NodeType.HTTP_REQUEST]: httpRequestExecutor,
  [NodeType.ANTHROPIC]: manualTriggerExecutor,
  [NodeType.OPENAI]: manualTriggerExecutor,
  [NodeType.DISCORD]: manualTriggerExecutor,
  [NodeType.GEMINI]: manualTriggerExecutor,
  [NodeType.GOOGLE_FORM_TRIGGER]: manualTriggerExecutor,
  [NodeType.SLACK]: manualTriggerExecutor,
  [NodeType.STRIPE_TRIGGER]: manualTriggerExecutor,
};

export const getExecutor = (nodeType: NodeType): NodeExecutor => {
  const executor = execuatorRegistry[nodeType];
  if (!executor) {
    throw new Error(`No executor found for node type: ${nodeType}`);
  }

  return executor;
};
