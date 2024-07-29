'use client';
import { usePetContext } from '@/lib/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface PetFormProps {
  actionType: 'add' | 'edit';
  onFormSubmission: () => void;
}

export default function PetForm({ actionType, onFormSubmission }: PetFormProps) {
  const { handleAddPet, handleEditPet, selectedPet } = usePetContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // const newPet = Object.fromEntries(formData.entries());
    const pet = {
      // id: ,
      name: formData.get('name') as string,
      ownerName: formData.get('ownerName') as string,
      imageUrl:
        (formData.get('imageUrl') as string) ||
        'https://cdn3.iconfinder.com/data/icons/essential-demo/32/cat_dog_animal_paw-256.png',
      age: +(formData.get('age') as string),
      notes: formData.get('notes') as string,
    };
    if (actionType === 'add') handleAddPet(pet);
    else if (actionType === 'edit') handleEditPet(selectedPet!.id, pet);

    onFormSubmission();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={actionType === 'edit' ? selectedPet?.name : ''}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            name="ownerName"
            type="text"
            required
            defaultValue={actionType === 'edit' ? selectedPet?.ownerName : ''}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            type="text"
            defaultValue={actionType === 'edit' ? selectedPet?.imageUrl : ''}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            name="age"
            type="number"
            min={1}
            required
            defaultValue={actionType === 'edit' ? selectedPet?.age : ''}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="nots">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            rows={4}
            required
            defaultValue={actionType === 'edit' ? selectedPet?.notes : ''}
          />
        </div>
      </div>

      <Button type="submit" className="mt-4 self-center">
        {actionType === 'add' ? 'Add Pet' : 'Submit Changes'}
      </Button>
    </form>
  );
}