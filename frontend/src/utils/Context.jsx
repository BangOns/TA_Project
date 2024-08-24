import React, { createContext, useState } from "react";
export const SortContext = createContext(null);
export const SearchContext = createContext(null);
export const GetIdContext = createContext(null);
export const GetDataPelajaranContext = createContext(null);
export const GetDataMahasiswaContext = createContext(null);
export default function ContextProvider({ children }) {
  const [sortCategory, sortCategorySet] = useState("");
  const [searchData, searchDataSet] = useState("");
  const [getDataById, getDataByIdSet] = useState({});
  const [GetDataPelajaranByContext, GetDataPelajaranByContextSet] = useState(
    []
  );
  const [GetDataMahasiswaByContext, GetDataMahasiswaByContextSet] = useState(
    []
  );
  return (
    <SortContext.Provider value={{ sortCategory, sortCategorySet }}>
      <SearchContext.Provider value={{ searchData, searchDataSet }}>
        <GetIdContext.Provider value={{ getDataById, getDataByIdSet }}>
          <GetDataPelajaranContext.Provider
            value={{ GetDataPelajaranByContext, GetDataPelajaranByContextSet }}
          >
            <GetDataMahasiswaContext.Provider
              value={{
                GetDataMahasiswaByContext,
                GetDataMahasiswaByContextSet,
              }}
            >
              {children}
            </GetDataMahasiswaContext.Provider>
          </GetDataPelajaranContext.Provider>
        </GetIdContext.Provider>
      </SearchContext.Provider>
    </SortContext.Provider>
  );
}
