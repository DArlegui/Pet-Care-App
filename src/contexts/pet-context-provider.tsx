'use client';
import { createContext, useState } from 'react';
import { PetProps } from '@/lib/types';

interface PetContextProviderProps {
  data: PetProps[];
  children: React.ReactNode;
}

interface TPetContext {
  pets: PetProps[];
  selectedPetId: string | null;
  selectedPet: PetProps | undefined;
  numberOfPets: number;
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
  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId((prevId) => (prevId === id ? null : id));
  };

  return (
    <PetContext.Provider value={{ pets, selectedPetId, selectedPet, numberOfPets, handleChangeSelectedPetId }}>
      {children}
    </PetContext.Provider>
  );
}
