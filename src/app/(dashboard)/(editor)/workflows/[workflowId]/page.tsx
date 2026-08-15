import { requireAuth } from "@/utils/permission";

interface PageProps {
  params: Promise<{
    workflowId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  await requireAuth();
  const { workflowId } = await params;
  return <div>Workflow: {workflowId}</div>;
}
