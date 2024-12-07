'use client';

import { CirclePlus, CircleUser, Home, Rows4, Trophy } from 'lucide-react';
import { Button } from './ui/button';
import { ActivityDrawer } from './ActivityDrawer';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Footer() {
  const pathname = usePathname();

  return (
    <footer className="w-full bg-background fixed bottom-0 border-t px-4">
      <nav className="h-14 gap-4 flex items-center justify-evenly">
        <Button
          variant="ghost"
          className={cn(
            'flex flex-col h-12 p-2 aspect-square gap-1',
            pathname === '/dashboard' && 'text-primary hover:text-primary'
          )}
          asChild
        >
          <Link href="/dashboard">
            <Home className="h-6 w-6" />
            <span className="text-[0.7rem] leading-3">Accueil</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          className={cn(
            'flex flex-col h-12 p-2 aspect-square gap-1',
            pathname === '/activities' && 'text-primary hover:text-primary'
          )}
          asChild
        >
          <Link href="/activities">
            <Rows4 className="h-6 w-6" />
            <span className="text-[0.7rem] leading-3">Activités</span>
          </Link>
        </Button>
        <ActivityDrawer>
          <Button variant="ghost" className="h-12 p-2 aspect-square">
            <CirclePlus className="!h-6 !w-6" />
          </Button>
        </ActivityDrawer>
        <Button
          variant="ghost"
          className={cn(
            'flex flex-col h-12 p-2 aspect-square gap-1',
            pathname === '/results' && 'text-primary hover:text-primary'
          )}
          asChild
        >
          <Link href="/results">
            <Trophy className="h-6 w-6" />
            <span className="text-[0.7rem] leading-3">Résultats</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          className={cn(
            'flex flex-col h-12 p-2 aspect-square gap-1',
            pathname === '/account' && 'text-primary hover:text-primary'
          )}
          asChild
        >
          <Link href="/account">
            <CircleUser className="h-6 w-6" />
            <span className="text-[0.7rem] leading-3">Vous</span>
          </Link>
        </Button>
      </nav>
      <div style={{ height: 'env(safe-area-inset-bottom)' }}></div>
    </footer>
  );
}
