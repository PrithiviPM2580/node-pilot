"use client";

import { ErrorView, LoadingView } from "@/components/entity-components";
import { useSuspenseWorkflow } from "@/features/workflows/hooks/use-workflows";

export default function Editor({ workflowId }: { workflowId: string }) {
  const { data: workflow } = useSuspenseWorkflow(workflowId);
  return <div></div>;
}

export function EditorLoading() {
  return <LoadingView message="Loading editor..." />;
}

export function EditorError() {
  return <ErrorView message="Error loading editor" />;
}
