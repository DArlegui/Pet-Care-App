//src\contexts\pet-context-provider.tsx
'use client';
import { addPet, deletePet, editPet } from '@/actions/actions';
import { PetProps } from '@/lib/types';
import { createContext, useOptimistic, useState } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
// import { Pet } from '@prisma/client'; //For now

interface PetContextProviderProps {
  data: PetProps[];
  children: React.ReactNode;
}

interface TPetContext {
  pets: PetProps[];
  selectedPetId: string | null;
  selectedPet: PetProps | undefined;
  numberOfPets: number;
  handleAddPet: (newPet: Omit<PetProps, 'id'>) => Promise<void>;
  handleEditPet: (petId: string, updatedPet: Omit<PetProps, 'id'>) => Promise<void>;
  handleCheckoutPet: (id: string) => Promise<void>;
  handleChangeSelectedPetId: (id: string) => void;
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
  const handleAddPet = async (newPet: Omit<PetProps, 'id'>) => {
    setOptimisticPets({ action: 'add', payload: newPet });
    const error = await addPet(newPet);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleEditPet = async (petId: string, newPetData: Omit<PetProps, 'id'>) => {
    setOptimisticPets({ action: 'edit', payload: { id: petId, ...newPetData } });
    const error = await editPet(petId, newPetData);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleCheckoutPet = async (petId: string) => {
    setOptimisticPets({ action: 'delete', payload: petId });
    const error = await deletePet(petId);
    if (error) {
      toast.warning(error.message);
      return;
    }
    setSelectedPetId(null);
  };

  const handleChangeSelectedPetId = (id: string) => setSelectedPetId((prevId) => (prevId === id ? null : id));

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
