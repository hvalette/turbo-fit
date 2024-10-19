'use client';

import { Footer } from '@/components/footer';
import { fr } from 'date-fns/locale';
import { setDefaultOptions } from 'date-fns';
import { Header } from '@/components/header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  setDefaultOptions({ locale: fr });

  return (
    <>
      <Header />
      <main className="mb-14">{children}</main>
      <Footer />
    </>
  );
}
