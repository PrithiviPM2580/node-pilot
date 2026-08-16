import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Editor, {
  EditorError,
  EditorLoading,
} from "@/features/editor/components/editor";
import EditorHeader from "@/features/editor/components/editor-header";
import { prefetchWorkflow } from "@/features/workflows/server/prefetch";
import { HydrateClient } from "@/trpc/server";
import { requireAuth } from "@/utils/permission";

interface PageProps {
  params: Promise<{
    workflowId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  await requireAuth();

  const { workflowId } = await params;

  prefetchWorkflow(workflowId);

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<EditorError />}>
        <Suspense fallback={<EditorLoading />}>
          <EditorHeader workflowId={workflowId} />
          <main className="flex-1">
            <Editor workflowId={workflowId} />
          </main>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
