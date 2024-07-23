'use client';
import { createContext, useState } from 'react';

interface SearchContextProviderProps {
  children: React.ReactNode;
}

interface TSearchContext {
  searchQuery: string;
  handChangeSearchQuery: (newValue: string) => void;
}

export const SearchContext = createContext<TSearchContext | null>(null);

export default function SearchContextProvider({ children }: SearchContextProviderProps) {
  //state
  const [searchQuery, setSearchQuery] = useState('');

  //derived state

  //event handlers
  const handChangeSearchQuery = (newValue: string) => {
    setSearchQuery(newValue);
  };

  return <SearchContext.Provider value={{ searchQuery, handChangeSearchQuery }}>{children}</SearchContext.Provider>;
}
