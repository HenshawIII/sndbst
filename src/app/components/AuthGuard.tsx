'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { ready, authenticated } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/');
    }
  }, [ready, authenticated, router]);

  if (!ready || !authenticated) {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-[var(--background)]">
        <CircularProgress
          size={60}
          thickness={4}
          className="text-blue-500"
        />
      </div>
    );
  }

  return <>{children}</>;
} 