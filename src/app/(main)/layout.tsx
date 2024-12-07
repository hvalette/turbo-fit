import { fr } from 'date-fns/locale';
import { setDefaultOptions } from 'date-fns';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  setDefaultOptions({ locale: fr });

  const session = await getServerSession();

  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <>
      <Header />
      <main className="mb-14 max-w-screen-lg mx-auto">{children}</main>
      <Footer />
    </>
  );
}
