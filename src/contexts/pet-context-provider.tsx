//src\contexts\pet-context-provider.tsx
'use client';
import { addPet, deletePet, editPet } from '@/actions/actions';
import { PetEssentials } from '@/lib/types';
import { Pet } from '@prisma/client';
import { createContext, useOptimistic, useState } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

interface PetContextProviderProps {
  data: Pet[];
  children: React.ReactNode;
}

interface TPetContext {
  pets: Pet[];
  selectedPetId: Pet['id'] | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleAddPet: (newPet: PetEssentials) => Promise<void>;
  handleEditPet: (petId: Pet['id'], updatedPet: PetEssentials) => Promise<void>;
  handleCheckoutPet: (id: Pet['id']) => Promise<void>;
  handleChangeSelectedPetId: (id: Pet['id']) => void;
}

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({ data, children }: PetContextProviderProps) {
  //state
  const [optimisticPets, setOptimisticPets] = useOptimistic(data, (state, { action, payload }) => {
    switch (action) {
      case 'add':
        return [...state, { ...payload, id: uuidv4() }];
      case 'edit':
        return state.map((pet) => (pet.id === payload.id ? { ...pet, ...payload.newPetData } : pet));
      case 'delete':
        return state.filter((pet) => pet.id !== payload);
      default:
        return state;
    }
  });
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  //derived state
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  //event handlers / actions
  const handleAddPet = async (newPet: PetEssentials) => {
    setOptimisticPets({ action: 'add', payload: newPet });
    const error = await addPet(newPet);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleEditPet = async (id: Pet['id'], newPetData: PetEssentials) => {
    setOptimisticPets({ action: 'edit', payload: { id: id, ...newPetData } });
    const error = await editPet(id, newPetData);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleCheckoutPet = async (id: Pet['id']) => {
    setOptimisticPets({ action: 'delete', payload: id });
    const error = await deletePet(id);
    if (error) {
      toast.warning(error.message);
      return;
    }
    setSelectedPetId(null);
  };

  const handleChangeSelectedPetId = (id: Pet['id']) => setSelectedPetId((prevId) => (prevId === id ? null : id));

  return (
    <PetContext.Provider
      value={{
        //state
        pets: optimisticPets,
        selectedPetId,
        //derived state
        selectedPet,
        numberOfPets,
        //event handlers
        handleAddPet,
        handleEditPet,
        handleCheckoutPet,
        handleChangeSelectedPetId,
      }}>
      {children}
    </PetContext.Provider>
  );
}
