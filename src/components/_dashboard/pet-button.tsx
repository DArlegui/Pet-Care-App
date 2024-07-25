'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlusIcon } from '@radix-ui/react-icons';
import { ReactNode, useState } from 'react';
import PetForm from './pet-form';

interface PetButtonProps {
  actionType: 'add' | 'edit' | 'checkout';
  children?: ReactNode;
  onClick?: () => void;
}

export default function PetButton({ actionType, children, onClick }: PetButtonProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (actionType === 'checkout') {
    return (
      <Button variant="secondary" onClick={onClick}>
        {children}
      </Button>
    );
  }

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        {actionType === 'add' ? (
          <Button size="icon">
            <PlusIcon className="h-6 w-6" />
          </Button>
        ) : (
          <Button variant="secondary">{children}</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{actionType === 'add' ? 'Add a Pet' : 'Edit Pet'}</DialogTitle>
        </DialogHeader>

        <PetForm actionType={actionType} onFormSubmission={() => setIsFormOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
