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
}

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({ data, children }: PetContextProviderProps) {
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState(null);

  return <PetContext.Provider value={{ pets, selectedPetId }}>{children}</PetContext.Provider>;
}
