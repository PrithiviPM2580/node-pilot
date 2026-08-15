import Image from "next/image";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-muted flex-center min-h-dvh flex-col gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center self-center gap-2 font-medium"
        >
          <Image src="/logos/logo.svg" alt="Logo" width={40} height={40} />
          <span>Node Pilot</span>
        </Link>
        {children}
      </div>
    </div>
  );
}
