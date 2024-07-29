"use client";

import { createContext, useState } from "react";

type SearchContextProviderProps = {
  children: React.ReactNode;
};

type TSearchContext = {
  searchQuery: string;
  chosenOccupation: string;
  handleChangeSearchQuery: (query: string) => void;
  handleOccupationChange: (occupation: string) => void;
};

export const SearchContext = createContext<TSearchContext | null>(null);

const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
  // state
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [chosenOccupation, setChosenOccupation] = useState<string>("");

  // derived state

  // handlers
  const handleChangeSearchQuery = (query: string) => {
    setSearchQuery(query);
  };

  const handleOccupationChange = (occupation: string) => {
    setChosenOccupation(occupation);
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        chosenOccupation,
        handleChangeSearchQuery,
        handleOccupationChange,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
