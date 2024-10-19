import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

interface Sport {
  id: string;
  name: string;
  icon: string;
  points: number;
}

export function useSports() {
  const localSports = sessionStorage.getItem('sports');

  const [sports, setSports] = useState<Sport[] | null>(() =>
    localSports ? JSON.parse(localSports) : null
  );
  const [pending, setPending] = useState(!localSports);

  useEffect(() => {
    if (!sports) {
      console.log('fetching sports');
      getDocs(collection(db, 'sports')).then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Sport, 'id'>),
        }));
        setSports(data);
        setPending(false);
        sessionStorage.setItem('sports', JSON.stringify(data));
      });
    }
  }, [sports]);

  return { sports, pending };
}
