'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  return (
    <div className="h-screen w-full bg-[url('/image/signin.webp')] bg-center">
      <div className="flex h-full w-full items-center justify-center px-4 backdrop-blur-md dark:backdrop-brightness-50">
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Connexion / Inscription</CardTitle>
            <CardDescription>
              Connectez vous ou inscrivez vous pour accéder à TurboFit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              className="w-full"
              onClick={() =>
                signIn('google', { callbackUrl: callbackUrl ?? '/dashboard' })
              }
            >
              Connexion avec Google
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
