'use client';
import { PetProps } from '@/lib/types';
import { createContext, useState } from 'react';

interface PetContextProviderProps {
  data: PetProps[];
  children: React.ReactNode;
}

interface TPetContext {
  pets: PetProps[];
  selectedPetId: string | null;
  selectedPet: PetProps | undefined;
  numberOfPets: number;
  handleAddPet: (newPet: Omit<PetProps, 'id'>) => void;
  handleCheckoutPet: (id: string) => void;
  handleChangeSelectedPetId: (id: string) => void;
}

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({ data, children }: PetContextProviderProps) {
  //state
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  //derived state
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = pets.length;

  //event handlers
  const handleAddPet = (newPet: Omit<PetProps, 'id'>) => {
    setPets((prevPets) => [
      ...prevPets,
      {
        id: Date.now().toString(),
        ...newPet,
      },
    ]);
  };
  const handleCheckoutPet = (id: string) => {
    setPets((prevPets) => prevPets.filter((pet) => pet.id !== id));
    setSelectedPetId(null);
  };
  const handleChangeSelectedPetId = (id: string) => setSelectedPetId((prevId) => (prevId === id ? null : id));

  return (
    <PetContext.Provider
      value={{
        //state
        pets,
        selectedPetId,
        //derived state
        selectedPet,
        numberOfPets,
        //event handlers
        handleAddPet,
        handleCheckoutPet,
        handleChangeSelectedPetId,
      }}>
      {children}
    </PetContext.Provider>
  );
}
