import React, { createContext, useState } from "react";
import Navbar_header from "./Navbar/Navbar_header";
import Navbar_aside from "./Navbar/Navbar_aside";
import { Outlet } from "react-router-dom";
export const SortContext = createContext(null);
export const SearchContext = createContext(null);
export default function Layout() {
  const [sortCategory, sortCategorySet] = useState("");
  const [searchData, searchDataSet] = useState("");
  return (
    <SortContext.Provider value={{ sortCategory, sortCategorySet }}>
      <SearchContext.Provider value={{ searchData, searchDataSet }}>
        <Navbar_header />
        <Navbar_aside />
        <main className="mt-[62px] h-auto ml-14 sm:ml-24 lg:ml-[280px] bg-slate-100">
          <article className="py-[35px] px-4 lg:px-[43px]">
            <Outlet />
          </article>
        </main>
      </SearchContext.Provider>
    </SortContext.Provider>
  );
}
