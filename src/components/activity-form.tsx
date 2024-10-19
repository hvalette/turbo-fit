'use client';

import { useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSports } from '@/hook/useSports';
import { CalendarIcon, Minus, Plus } from 'lucide-react';
import { Button } from './ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { format, startOfDay } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { cn } from '@/lib/utils';
import { useUser } from '@/hook/useUser';
import { addDoc, collection, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { SportIcon } from './sport-icon';

const activityFormSchema = z.object({
  duration: z.number().min(15),
  sport: z.string(),
  date: z.date(),
});

export function ActivityForm({ onSubmit }: { onSubmit: () => void }) {
  const { sports } = useSports();
  const { user } = useUser();

  const form = useForm<z.infer<typeof activityFormSchema>>({
    resolver: zodResolver(activityFormSchema),
    defaultValues: {
      duration: 45,
      date: new Date(),
      sport: sports?.[0].id,
    },
  });

  const formatActivityDuration = (minutes: number) => {
    if (minutes < 60) {
      return (
        <>
          {minutes % 60}
          <span className="text-base">min</span>
        </>
      );
    }
    return (
      <>
        {Math.floor(minutes / 60)}
        <span className="text-base">h</span>
        {minutes % 60}
        <span className="text-base">min</span>
      </>
    );
  };

  const onFormSubmit = async (data: z.infer<typeof activityFormSchema>) => {
    console.log(data.sport);
    const sport = sports?.find((s) => s.id === data.sport);
    await addDoc(collection(db, 'activities'), {
      duration: data.duration,
      sportRef: doc(db, `sports/${data.sport}`),
      date: startOfDay(data.date),
      userRef: doc(db, `users/${user?.uid}`),
      points: sport?.points ?? 0 * data.duration,
      createdAt: new Date().toISOString(),
    });
    onSubmit();
  };

  useEffect(() => {
    console.log('sports', sports);
    if (sports) {
      console.log('setting default sport', sports[0].id);
      form.setValue('sport', sports[0].id);
    }
  }, [form, sports]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFormSubmit)}
        className="max-w-96 w-full flex flex-col gap-4 px-12"
      >
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="w-full flex justify-between items-center gap-4 px-4">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    disabled={field.value <= 15}
                    onClick={() =>
                      form.setValue(field.name, (field.value -= 15))
                    }
                  >
                    <Minus className="h-6 w-6" />
                  </Button>
                  <div className="text-6xl mx-auto">
                    {formatActivityDuration(field.value)}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() =>
                      form.setValue(field.name, (field.value += 15))
                    }
                  >
                    <Plus className="h-6 w-6" />
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sport"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue
                    className={cn(!field.value && 'text-muted-foreground')}
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {sports?.map((sport) => (
                  <SelectItem key={sport.id} value={sport.id.toString()}>
                    <div className="flex items-center gap-1">
                      <SportIcon sport={sport.icon} className="h-4" />
                      <span>{sport.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover modal={true}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="default">
          Submit
        </Button>
      </form>
    </Form>
  );
}
