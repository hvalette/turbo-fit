import { useState } from 'react';
import { auth } from '@/lib/auth';
import { User } from 'firebase/auth';

export function useUser() {
  const [user, setUser] = useState<User | null>();
  const [pending, setPending] = useState(true);

  auth.onAuthStateChanged((user) => {
    setPending(false);
    setUser(user);
  });

  return { user, pending };
}
