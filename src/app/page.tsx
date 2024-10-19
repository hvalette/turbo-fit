'use client';

import { useUser } from '@/hook/useUser';

export default function Page() {
  // Confirm the link is a sign-in with email link.

  const { user } = useUser();

  return <div>{user && <h1>Hello, {user?.email}</h1>}</div>;
}
