import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

export interface UserWithScore extends User {
  score: number;
}

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch('/api/users');
  return response.json();
};

export const useFetchUsers = () => {
  return useQuery({ queryKey: ['users'], queryFn: fetchUsers });
};

export const fetchUsersWithScore = async (): Promise<UserWithScore[]> => {
  const response = await fetch('/api/users?score=true');
  return response.json();
};

export const useFetchUsersWithScore = () => {
  return useQuery({
    queryKey: ['users-with-score'],
    queryFn: fetchUsersWithScore,
  });
};
