import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';

export default function PetFormBtn({ actionType }: { actionType: 'add' | 'edit' }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="mt-4 self-center">
      {actionType === 'add' ? 'Add Pet' : 'Submit Changes'}
    </Button>
  );
}
