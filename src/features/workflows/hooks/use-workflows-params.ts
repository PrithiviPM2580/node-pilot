import { useQueryStates } from "nuqs";
import { workflowParams } from "../params";

export function useWorkflowsParams() {
  return useQueryStates(workflowParams);
}
