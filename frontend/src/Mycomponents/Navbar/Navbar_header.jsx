import IconsImport from "@/utils/IconsImport";
import ImagesImport from "@/utils/ImagesImport";
import React from "react";

export default function Navbar_header() {
  return (
    <nav className=" fixed top-0 bg-white shadow w-full px-5 md:px-10 py-4 flex justify-end">
      <header className="flex gap-3">
        <section className="text-end">
          <h1 className="text-xs max-md:text-sm font-bold">Thomas Anree</h1>
          <h2 className="text-xs text-slate-400/80 font-bold">Admin</h2>
        </section>
        <figure className="flex gap-3 items-center">
          <img
            src={ImagesImport.Profile}
            alt=""
            className="max-md:w-10 max-md:h-10"
          />
          <img
            src={IconsImport.Dropdown}
            alt=""
            width={21}
            height={20}
            className="w-5 h-5"
          />
        </figure>
      </header>
    </nav>
  );
}
