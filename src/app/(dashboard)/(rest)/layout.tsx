import AppHeader from "@/components/app-header";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <AppHeader />
      <main className="flex-1">{children}</main>
    </>
  );
}
