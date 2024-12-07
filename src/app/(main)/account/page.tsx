'use client';

import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

export default function Page() {
  return (
    <div className="p-2">
      <Button
        variant="destructive"
        className="w-full"
        onClick={() => signOut()}
      >
        Se deconnecter
      </Button>
    </div>
  );
}
