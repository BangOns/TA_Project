import React, { createContext, useState } from "react";
export const SortContext = createContext(null);
export const SearchContext = createContext(null);
export const GetIdContext = createContext(null);
export default function ContextProvider({ children }) {
  const [sortCategory, sortCategorySet] = useState("");
  const [searchData, searchDataSet] = useState("");
  const [getDataById, getDataByIdSet] = useState({});
  return (
    <SortContext.Provider value={{ sortCategory, sortCategorySet }}>
      <SearchContext.Provider value={{ searchData, searchDataSet }}>
        <GetIdContext.Provider value={{ getDataById, getDataByIdSet }}>
          {children}
        </GetIdContext.Provider>
      </SearchContext.Provider>
    </SortContext.Provider>
  );
}
