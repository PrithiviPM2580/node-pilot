import { requireAuth } from "@/utils/permission";

interface PageProps {
  params: Promise<{
    credentialId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  await requireAuth();

  const { credentialId } = await params;
  return <div>Credential: {credentialId}</div>;
}
