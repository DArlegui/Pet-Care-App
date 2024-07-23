import AppFooter from '@/components/_root/app-footer';
import AppHeader from '@/components/_root/app-header';
import BackgroundPattern from '@/components/_root/background-pattern';
import PetContextProvider from '@/contexts/pet-context-provider';
import SearchContextProvider from '@/contexts/search-context-provider';
import { PetProps } from '@/lib/types';
import React from 'react';

export default async function layout({ children }: { children: React.ReactNode }) {
  const response = await fetch('https://bytegrad.com/course-assets/projects/petsoft/api/pets');

  if (!response) throw new Error('Failed to fetch pets');

  const data: PetProps[] = await response.json();

  return (
    <div>
      <BackgroundPattern />
      <div className="flex flex-col max-w-[1050px] mx-auto px-4 min-h-screen">
        <AppHeader />
        <SearchContextProvider>
          <PetContextProvider data={data}>{children}</PetContextProvider>
        </SearchContextProvider>
        <AppFooter />
      </div>
    </div>
  );
}
