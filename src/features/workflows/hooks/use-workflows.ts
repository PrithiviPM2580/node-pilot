import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "@/components/ui/toast";
import { useTRPC } from "@/trpc/client";
import { useWorkflowsParams } from "./use-workflows-params";

export function useSuspenseWorkflows() {
  const trpc = useTRPC();
  const [params] = useWorkflowsParams();

  return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params));
}

export function useCreateWorkflow() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.workflows.create.mutationOptions({
      onSuccess: (data) => {
        toast.add({
          type: "success",
          description: `Workflow ${data.name} created successfully`,
        });
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
      },
      onError: (error) => {
        toast.add({
          type: "error",
          description: `Error creating workflow: ${error.message}`,
        });
      },
    }),
  );
}

export function useRemoveWorkflow() {
  const trpc = useTRPC();

  const queryClient = useQueryClient();

  return useMutation(
    trpc.workflows.remove.mutationOptions({
      onSuccess: (data) => {
        toast.add({
          type: "success",
          description: `Workflow ${data.name} removed`,
        });
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
        queryClient.invalidateQueries(
          trpc.workflows.getOne.queryOptions({ id: data.id }),
        );
      },
      onError: (error) => {
        toast.add({
          type: "error",
          description: `Error removing workflow: ${error.message}`,
        });
      },
    }),
  );
}

export function useSuspenseWorkflow(id: string) {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.workflows.getOne.queryOptions({ id }));
}

export function useUpdateWorkflowName() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.workflows.updateName.mutationOptions({
      onSuccess: (data) => {
        toast.add({
          type: "success",
          description: `Workflow ${data.name} updated`,
        });
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
        queryClient.invalidateQueries(
          trpc.workflows.getOne.queryOptions({ id: data.id }),
        );
      },
      onError: (error) => {
        toast.add({
          type: "error",
          description: `Error updating  workflow: ${error.message}`,
        });
      },
    }),
  );
}

export function useUpdateWorkflow() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.workflows.update.mutationOptions({
      onSuccess: (data) => {
        toast.add({
          type: "success",
          description: `Workflow ${data.name} saved`,
        });
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
        queryClient.invalidateQueries(
          trpc.workflows.getOne.queryOptions({ id: data.id }),
        );
      },
      onError: (error) => {
        toast.add({
          type: "error",
          description: `Error to save workflow: ${error.message}`,
        });
      },
    }),
  );
}

export function useExecuteWorkflow() {
  const trpc = useTRPC();

  return useMutation(
    trpc.workflows.execute.mutationOptions({
      onSuccess: (data) => {
        toast.add({
          type: "success",
          description: `Workflow ${data.name} executed`,
        });
      },
      onError: (error) => {
        toast.add({
          type: "error",
          description: `Error to execute workflow: ${error.message}`,
        });
      },
    }),
  );
}
