import IconsImport from "@/utils/IconsImport";
import ImagesImport from "@/utils/ImagesImport";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Button_DropDown_Navbar from "./Child_Component_Navbar/Button_DropDown_Navbar";

export default function Navbar_header() {
  const TokenCookies = Cookies.get("token");
  const [data, dataSet] = useState({});
  function GetDataByToken(token) {
    const splitToken = token.split(".");
    const payload = JSON.parse(atob(splitToken[1]));
    dataSet(payload);
  }

  useEffect(() => {
    if (TokenCookies) {
      GetDataByToken(TokenCookies);
    }
  }, [TokenCookies]);

  return (
    <nav className=" fixed top-0 bg-white shadow w-full px-5 md:px-10 py-4 flex justify-end">
      <header className="flex gap-3">
        <section className="text-end">
          <h1 className="text-xs max-md:text-sm font-bold">
            {data.name || "John Doe"}
          </h1>
          <h2 className="text-xs text-slate-400/80 font-bold">
            {data.role || "none"}
          </h2>
        </section>
        <figure className="flex gap-3 items-center">
          <img
            src={ImagesImport.Profile}
            alt=""
            className="max-md:w-10 max-md:h-10"
          />
          <Button_DropDown_Navbar />
        </figure>
      </header>
    </nav>
  );
}
