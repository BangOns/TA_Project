import { Button } from "@/components/ui/button";

import IconsImport from "@/utils/IconsImport";

import React, { Suspense, useEffect, useState } from "react";
import Card_Dashboard from "@/Mycomponents/Dashboard_Admin/Card_Dashboard";
import Chart_Dashboard from "@/Mycomponents/Dashboard_Admin/Chart_Dashboard";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { CheckCookiesValid } from "@/utils/GetData";

export default function Dashboard_Admin() {
  const [checkCookies, checkCookiesSet] = useState(false);
  const cookies = Cookies.get("token");
  async function checkCookiesWithGetDataMahasiswa() {
    const response = await CheckCookiesValid(cookies);
    if (response.status === 200) {
      checkCookiesSet(true);
    } else {
      checkCookiesSet(false);
    }
  }
  useEffect(() => {
    checkCookiesWithGetDataMahasiswa();
  }, [cookies]);
  return (
    <>
      {checkCookies ? (
        <>
          <article className="w-full grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 place-content-stretch gap-[35px] mt-[45px]">
            <Suspense>
              <Card_Dashboard
                title={"Total Mahasiswa"}
                icons={IconsImport.TotalStudent}
                persentation={"8,5%"}
              />
            </Suspense>
            <Card_Dashboard
              title={"Total Pelajaran"}
              icons={IconsImport.Certified}
              persentation={"8,5%"}
            />
            <Card_Dashboard
              title={"Average Certification Score"}
              icons={IconsImport.Score}
              range={"84.62"}
              persentation={"8,5%"}
            />
          </article>
          <article className="mt-[45px]">
            <Chart_Dashboard />
          </article>
        </>
      ) : (
        <>
          <article className="w-full h-screen grid place-items-center text center">
            <section className="flex flex-col items-center">
              <h1>Please login again 🙁, because youre token not valid</h1>
              <Link to={"/"}>
                <Button variant="outline" className="mt-5">
                  Login
                </Button>
              </Link>
            </section>
          </article>
        </>
      )}
    </>
  );
}
