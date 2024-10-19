'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  sendEmailLink,
  signInWithEmailLink,
  signInWithGoogle,
} from '@/lib/auth';
import { useState } from 'react';

export default function Login() {
  signInWithEmailLink();
  const handleLoginWithEmail = async () => {
    try {
      await sendEmailLink(email);
    } catch (error) {
      console.error(error);
    }
  };
  const [email, setEmail] = useState('');

  const handleSignInWithGoogle = () => {
    signInWithGoogle();
  };

  return (
    <div className="h-screen grid place-items-center bg-[url('/login.webp')] bg-center bg-cover">
      <Card className="mx-auto max-w-sm ">
        <CardHeader>
          <CardTitle className="text-2xl">Connexion</CardTitle>
          <CardDescription>
            Saisissez votre email pour vous connecter ou vous inscrire
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="m@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={handleLoginWithEmail}
            >
              Connexion
            </Button>
          </form>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleSignInWithGoogle}
          >
            Connexion avec Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
