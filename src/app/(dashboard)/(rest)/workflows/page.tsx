import type { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  WorkflowsContainer,
  WorkflowsList,
} from "@/features/workflows/components/workflows";
import { workflowParamsLoader } from "@/features/workflows/server/params-loader";
import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { HydrateClient } from "@/trpc/server";
import { requireAuth } from "@/utils/permission";

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function Page({ searchParams }: Props) {
  await requireAuth();

  const params = await workflowParamsLoader(searchParams);

  prefetchWorkflows(params);
  return (
    <WorkflowsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
          <Suspense fallback={<p>Loading workflows...</p>}>
            <WorkflowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowsContainer>
  );
}
