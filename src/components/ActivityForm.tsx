'use client';

import { useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CalendarIcon, Minus, Plus } from 'lucide-react';
import { Button } from './ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { SportIcon } from './SportIcon';
import { useFetchSports } from '@/data/sports';
import { useCreateActivity } from '@/data/activities';
import { useSession } from 'next-auth/react';
import { useFetchUsers } from '@/data/users';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { User } from '@prisma/client';
import { Spinner } from './ui/spinner';

const activityFormSchema = z.object({
  duration: z.number().min(15),
  sportId: z.string(),
  date: z.date(),
  userIds: z.array(z.string()),
});

export function ActivityForm({ onSubmit }: { onSubmit: () => void }) {
  const { data: sports = [] } = useFetchSports();
  const createActivity = useCreateActivity();
  const { data: session } = useSession();
  const { data: users = [] } = useFetchUsers();

  const form = useForm<z.infer<typeof activityFormSchema>>({
    resolver: zodResolver(activityFormSchema),
    defaultValues: {
      duration: 45,
      date: new Date(),
      sportId: sports[0] ? sports[0].id : undefined,
      userIds: session?.user?.id ? [session?.user?.id] : [],
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

  const userIdsPlaceholder = (selectedUserIds: string[], users: User[]) => {
    if (selectedUserIds.length === 0) {
      return 'Sélectionner des participants';
    }
    if (selectedUserIds.length === 1) {
      if (selectedUserIds[0] === session?.user?.id) {
        return 'Moi';
      }
      return users.find((user) => user.id === selectedUserIds[0])?.name;
    }
    if (selectedUserIds.length === users.length) {
      return 'Tout le monde';
    }
    const me = selectedUserIds.includes(session?.user?.id ?? '');
    if (me) {
      return `Moi et ${selectedUserIds.length - 1} autre${
        selectedUserIds.length > 2 ? 's' : ''
      }`;
    }
    return `${selectedUserIds.length} participant${
      selectedUserIds.length > 1 ? 's' : ''
    }`;
  };

  const onFormSubmit = async (data: z.infer<typeof activityFormSchema>) => {
    if (
      !data.sportId ||
      !data.userIds ||
      data.userIds.length === 0 ||
      !data.date ||
      !data.duration
    )
      return;
    const sport = sports?.find((sport) => sport.id === data.sportId);
    const score = (sport?.value ?? 0) * (data.duration / 15);
    createActivity.mutate({
      duration: data.duration,
      score,
      date: startOfDay(data.date),
      sportId: data.sportId,
      userIds: data.userIds,
    });
    onSubmit();
  };

  useEffect(() => {
    if (sports[0]) {
      form.setValue('sportId', sports[0].id);
    }
  }, [form, sports]);

  useEffect(() => {
    if (session?.user?.id) {
      form.setValue('userIds', [session?.user?.id]);
    }
  }, [form, session]);

  if (users.length === 0 || sports.length === 0) {
    return <Spinner />;
  }

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
          name="sportId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Sport</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      className={cn(!field.value && 'text-muted-foreground')}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="h-64">
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
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="userIds"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Participants</FormLabel>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start font-normal"
                  >
                    {userIdsPlaceholder(field.value, users)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full h-64 overflow-auto">
                  {users?.map((user) => (
                    <DropdownMenuCheckboxItem
                      key={user.id}
                      checked={field.value.includes(user.id)}
                      onCheckedChange={(checked) =>
                        field.onChange(
                          checked
                            ? [...field.value, user.id]
                            : field.value.filter((id) => id !== user.id)
                        )
                      }
                    >
                      {user.name}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
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
        <Button type="submit" variant="default" className="mt-4">
          Submit
        </Button>
      </form>
    </Form>
  );
}
