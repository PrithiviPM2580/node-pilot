import { requireAuth } from "@/utils/permission";

export default async function Page() {
  await requireAuth();
  return <div></div>;
}
