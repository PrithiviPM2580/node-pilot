"use client";

import { useRouter } from "next/navigation";
import {
  EntityContainer,
  EntityHeader,
  EntityPagination,
  EntitySearch,
} from "@/components/entity-components";
import { useEntitySearch } from "@/hooks/use-entity-search";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import {
  useCreateWorkflow,
  useSuspenseWorkflows,
} from "../hooks/use-workflows";
import { useWorkflowsParams } from "../hooks/use-workflows-params";

export function WorkflowsSearch() {
  const [params, setParams] = useWorkflowsParams();
  const { searchValue, onSearchChange } = useEntitySearch({
    params,
    setParams,
  });
  return (
    <EntitySearch
      value={searchValue}
      onChange={onSearchChange}
      placeholder="Search Workflows"
    />
  );
}

export function WorkflowsPagination() {
  const workflows = useSuspenseWorkflows();
  const [params, setParams] = useWorkflowsParams();

  return (
    <EntityPagination
      disabled={workflows.isFetching}
      totalPages={workflows.data.totalPages}
      page={workflows.data.page}
      onPageChange={(page) => setParams({ ...params, page })}
    />
  );
}

export function WorkflowsList() {
  const workflows = useSuspenseWorkflows();
  return <div></div>;
}

export function WorkflowsHeader({ disabled }: { disabled?: boolean }) {
  const router = useRouter();
  const createWorkflow = useCreateWorkflow();
  const { handleError, modal } = useUpgradeModal();

  function handleCreateWorkflow() {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      },
      onError: (error) => {
        handleError(error);
      },
    });
  }

  return (
    <>
      {modal}
      <EntityHeader
        title="Workflows"
        description="Create and manage your workflows"
        onNew={handleCreateWorkflow}
        newButtonLabel="New workflow"
        disabled={disabled}
        isCreating={false}
      />
    </>
  );
}

export function WorkflowsContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<WorkflowsSearch />}
      pagination={null}
    >
      {children}
    </EntityContainer>
  );
}
