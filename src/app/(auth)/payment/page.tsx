'use client';

import { createCheckoutSession } from '@/actions/actions';
import H1 from '@/components/_marketing/h1';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';

export default function PaymentPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <main className="flex flex-col items-center space-y-9">
      <H1>PetCare access requires payment</H1>

      {!searchParams.success && (
        <Button
          disabled={isPending}
          onClick={async () => {
            startTransition(() => {
              createCheckoutSession();
            });
          }}>
          Buy lifetime access for $29.99
        </Button>
      )}
      {searchParams.success && <p className="tx-sm text-green-700">Payment successful!</p>}
      {searchParams.cancelled && <p className="tx-sm text-red-700">Payment cancelled.</p>}
    </main>
  );
}
