import { Snail } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="h-14 w-full bg-background sticky top-0 border-b px-4 gap-4 flex items-center  justify-between z-50">
      <div className="flex gap-2 items-center">
        <Snail className="h-8 w-8" />
        <span className="text-xl font-black tracking-widest">TurboFit</span>
      </div>
      <ThemeToggle />
    </header>
  );
}
