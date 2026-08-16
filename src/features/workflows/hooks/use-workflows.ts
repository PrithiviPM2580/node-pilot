import {
  useQueryClient,
  useMutation,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { toast } from "@/components/ui/toast";

export const useSuspenseWorkflows = () => {
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.workflows.getMany.queryOptions());
};

export const useCreateWorkflow = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.workflows.create.mutationOptions({
      onSuccess: (data) => {
        toast.add({
          type: "success",
          description: `Workflow ${data.name} created successfully`,
        });
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions());
      },
      onError: (error) => {
        toast.add({
          type: "error",
          description: `Error creating workflow: ${error.message}`,
        });
      },
    }),
  );
};
