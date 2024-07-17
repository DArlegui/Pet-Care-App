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
  handleChangeSelectedPetId: (id: string) => void;
}

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({ data, children }: PetContextProviderProps) {
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };

  return (
    <PetContext.Provider value={{ pets, selectedPetId, handleChangeSelectedPetId }}>{children}</PetContext.Provider>
  );
}
