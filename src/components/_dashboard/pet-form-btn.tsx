import { Button } from '../ui/button';

type PetFormBtnProps = {
  actionType: 'add' | 'edit';
};

export default function PetFormBtn({ actionType }: PetFormBtnProps) {
  return (
    <Button type="submit" className="mt-4 self-center">
      {actionType === 'add' ? 'Add Pet' : 'Submit Changes'}
    </Button>
  );
}
