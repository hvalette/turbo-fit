import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from './ui/button';
import { ActivityForm } from './ActivityForm';
import { useState } from 'react';

export function ActivityDrawer({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="bg-background items-center">
        <DrawerHeader>
          <DrawerTitle>Nouvelle activité</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <ActivityForm onSubmit={() => setOpen(false)} />
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
