import AppFooter from '@/components/_root/app-footer';
import AppHeader from '@/components/_root/app-header';
import BackgroundPattern from '@/components/_root/background-pattern';
import { Toaster } from '@/components/ui/sonner';
import PetContextProvider from '@/contexts/pet-context-provider';
import SearchContextProvider from '@/contexts/search-context-provider';
import { checkAuth, getPetsbyUserId } from '@/lib/server-utils';
import React from 'react';

export default async function layout({ children }: { children: React.ReactNode }) {
  const session = await checkAuth();
  const pets = await getPetsbyUserId(session.user.id);

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
      <Toaster position="top-right" />
    </div>
  );
}
