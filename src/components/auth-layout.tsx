import type { ReactNode } from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-foreground">
      <Shield className="text-accent h-7 w-7" />
      AuthZen
    </Link>
  );
}

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex justify-center">
          <Logo />
        </div>
        {children}
      </div>
    </div>
  );
}
