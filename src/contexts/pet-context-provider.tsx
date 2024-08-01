'use client';
import { addPet } from '@/actions/actions';
import { createContext, useState } from 'react';
import { Pet } from '@prisma/client';

interface PetContextProviderProps {
  data: Pet[];
  children: React.ReactNode;
}

interface TPetContext {
  pets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleAddPet: (newPet: Omit<Pet, 'id'>) => void;
  handleEditPet: (petId: string, updatedPet: Omit<Pet, 'id'>) => void;
  handleCheckoutPet: (id: string) => void;
  handleChangeSelectedPetId: (id: string) => void;
}

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({ data: pets, children }: PetContextProviderProps) {
  //state
  // const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  //derived state
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = pets.length;

  //event handlers
  const handleAddPet = async (newPet: Omit<Pet, 'id'>) => {
    // setPets((prevPets) => [
    //   ...prevPets,
    //   {
    //     id: Date.now().toString(),
    //     ...newPet,
    //   },
    // ]);

    //server action
    await addPet(newPet);
  };

  const handleEditPet = (petId: string, updatedPet: Omit<Pet, 'id'>) => {
    // setPets((prevPets) =>
    //   prevPets.map((pet) => {
    //     if (pet.id === petId) {
    //       return {
    //         id: petId,
    //         ...updatedPet,
    //       };
    //     }
    //     return pet;
    //   })
    // );
  };

  const handleCheckoutPet = (id: string) => {
    // setPets((prevPets) => prevPets.filter((pet) => pet.id !== id));
    // setSelectedPetId(null);
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
        handleEditPet,
        handleCheckoutPet,
        handleChangeSelectedPetId,
      }}>
      {children}
    </PetContext.Provider>
  );
}
