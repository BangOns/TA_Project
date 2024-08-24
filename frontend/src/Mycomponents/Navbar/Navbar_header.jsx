import IconsImport from "@/utils/IconsImport";
import ImagesImport from "@/utils/ImagesImport";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import Button_DropDown_Navbar from "./Child_Component_Navbar/Button_DropDown_Navbar";
import { GetIdContext } from "@/utils/Context";
import { useQuery } from "@tanstack/react-query";
import { getDataMahasiswaById } from "@/utils/GetData";

export default function Navbar_header() {
  const TokenCookies = Cookies.get("token");
  const { getDataByIdSet } = useContext(GetIdContext);
  const [getId, getIdSet] = useState("");
  function GetDataByToken(token) {
    const splitToken = token.split(".");
    const payload = JSON.parse(atob(splitToken[1]));
    getIdSet(payload.id);
  }
  const { data, isLoading } = useQuery({
    queryKey: ["admin"],
    queryFn: async () => await getDataMahasiswaById(getId, TokenCookies),
    enabled: !!TokenCookies && !!getId,
    select: (data) => data.data.data,
  });

  useEffect(() => {
    if (TokenCookies) {
      GetDataByToken(TokenCookies);
    }
  }, [TokenCookies]);
  useEffect(() => {
    if (!isLoading && data) {
      getDataByIdSet(data);
    }
  }, [data]);
  return (
    <nav className=" fixed top-0 bg-white shadow w-full px-5 md:px-10 py-4 flex justify-end">
      <header className="flex gap-3">
        <section className="text-end">
          <h1 className="text-xs max-md:text-sm font-bold">
            {!isLoading && data && data.name}
          </h1>
          <h2 className="text-xs text-slate-400/80 font-bold">
            {!isLoading && data && data.role}
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
