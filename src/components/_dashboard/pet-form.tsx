'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DEFAULT_PET_IMAGE } from '@/lib/constants';
import { usePetContext } from '@/lib/hooks';
import { petFormSchema, TPetForm } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import PetFormBtn from './pet-form-btn';

interface PetFormProps {
  actionType: 'add' | 'edit';
  onFormSubmission: () => void;
}

export default function PetForm({ actionType, onFormSubmission }: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<TPetForm>({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      name: actionType == 'edit' ? selectedPet?.name : '',
      ownerName: actionType == 'edit' ? selectedPet?.ownerName : '',
      imageUrl: actionType == 'edit' ? selectedPet?.imageUrl : '',
      age: actionType == 'edit' ? Number(selectedPet?.age) : 0,
      notes: actionType == 'edit' ? selectedPet?.notes : '',
    },
  });

  return (
    <form
      action={async () => {
        const result = await trigger();
        if (!result) return;

        onFormSubmission();

        const petData = getValues();
        petData.imageUrl = petData.imageUrl || DEFAULT_PET_IMAGE;

        if (actionType === 'add') {
          await handleAddPet(petData);
        } else if (actionType === 'edit') {
          await handleEditPet(selectedPet!.id, petData);
        }
      }}
      className="flex flex-col">
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register('name')} />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input id="ownerName" {...register('ownerName')} />
          {errors.ownerName && <span className="text-red-500">{errors.ownerName.message}</span>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input id="imageUrl" {...register('imageUrl')} />
          {errors.imageUrl && <span className="text-red-500">{errors.imageUrl.message}</span>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input id="age" type="number" {...register('age')} />
          {errors.age && <span className="text-red-500">{errors.age.message}</span>}
        </div>
        <div className="space-y-1">
          <Label htmlFor="nots">Notes</Label>
          <Textarea id="notes" {...register('notes')} />
          {errors.notes && <span className="text-red-500">{errors.notes.message}</span>}
        </div>
      </div>
      <PetFormBtn actionType={actionType} />
    </form>
  );
}
