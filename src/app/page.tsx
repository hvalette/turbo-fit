import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  // Confirm the link is a sign-in with email link.

  const session = await getServerSession();

  if (!session) {
    redirect('/api/auth/signin');
  }

  redirect('/dashboard');
}
