import H1 from '@/components/_marketing/h1';
import { Button } from '@/components/ui/button';

export default function PaymentPage() {
  return (
    <main className="flex flex-col items-center space-y-9">
      <H1>PetSoft access requires payment</H1>
      <Button>Buy lifetime access for $0</Button>
    </main>
  );
}
