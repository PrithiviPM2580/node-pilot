import AuthLayout from "@/features/auth/components/auth-layout";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <AuthLayout>{children}</AuthLayout>;
}
