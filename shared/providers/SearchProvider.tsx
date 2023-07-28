import React, { useState } from "react";
export interface UseSearchContextType {
  criterial: string;
  setCriterial: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchContext = React.createContext({} as UseSearchContextType);

export const useSearchContext = () => React.useContext(SearchContext);

const SearchProvider: React.FC = ({ children }) => {
  const [criterial, setCriterial] = useState("");
  const context = { criterial, setCriterial };

  return (
    <SearchContext.Provider value={context}>{children}</SearchContext.Provider>
  );
};

export default SearchProvider;
