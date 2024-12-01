import { fr } from 'date-fns/locale';
import { setDefaultOptions } from 'date-fns';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  setDefaultOptions({ locale: fr });

  return (
    <>
      <Header />
      <main className="mb-14 max-w-screen-lg mx-auto">{children}</main>
      <Footer />
    </>
  );
}
