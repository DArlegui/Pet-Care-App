'use client';
import { logOut } from '@/actions/actions';
import { useTransition } from 'react';
import { Button } from '../ui/button';

export default function SignOutBtn() {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      disabled={isPending}
      onClick={async () => {
        startTransition(async () => {
          await logOut();
        });
      }}>
      Sign Out
    </Button>
  );
}
