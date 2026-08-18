import { FlaskConicalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExecuteWorkflow } from "@/features/workflows/hooks/use-workflows";

interface ExecuteWorkflowButtonProps {
  workflowId: string;
}

export default function ExecuteWorkflowButton({
  workflowId,
}: ExecuteWorkflowButtonProps) {
  const executeWorkflow = useExecuteWorkflow();

  function handleExecute() {
    executeWorkflow.mutate({ id: workflowId });
  }
  return (
    <Button
      size="lg"
      onClick={handleExecute}
      disabled={executeWorkflow.isPending}
    >
      <FlaskConicalIcon className="size-4" />
      Execute Workflow
    </Button>
  );
}
