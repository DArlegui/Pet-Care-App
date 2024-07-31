import AppFooter from '@/components/_root/app-footer';
import AppHeader from '@/components/_root/app-header';
import BackgroundPattern from '@/components/_root/background-pattern';
import PetContextProvider from '@/contexts/pet-context-provider';
import SearchContextProvider from '@/contexts/search-context-provider';
import prisma from '@/lib/db';
import React from 'react';

export default async function layout({ children }: { children: React.ReactNode }) {
  const pets = await prisma.pet.findMany();

  return (
    <div>
      <BackgroundPattern />
      <div className="flex flex-col max-w-[1050px] mx-auto px-4 min-h-screen">
        <AppHeader />
        <SearchContextProvider>
          <PetContextProvider data={pets}>{children}</PetContextProvider>
        </SearchContextProvider>
        <AppFooter />
      </div>
    </div>
  );
}
