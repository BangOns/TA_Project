import Button_Add_Student from "@/Mycomponents/Dashboard_Student/Button_Add_Student";
import Filter_Student from "@/Mycomponents/Dashboard_Student/Filter_Student";
import React, { useEffect, useState } from "react";

import Table_Data_Student from "@/Mycomponents/Dashboard_Student/Table_Data_Student";
import Search_and_Settings from "@/Mycomponents/Dashboard_Student/Search_and_Settings";
import { CheckCookiesValid } from "@/utils/GetData";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Loading_Table from "@/Mycomponents/LoadingComponent/TableLoading";
export default function Dashboard_Student() {
  const [checkCookies, checkCookiesSet] = useState(false);
  const [loadingtable, loadingTableSet] = useState(false);
  const cookies = Cookies.get("token");
  async function checkCookiesWithGetDataMahasiswa() {
    loadingTableSet(true);
    try {
      const response = await CheckCookiesValid(cookies);
      if (response.status === 200) {
        checkCookiesSet(true);
        loadingTableSet(false);
      } else {
        checkCookiesSet(false);
        loadingTableSet(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  useEffect(() => {
    checkCookiesWithGetDataMahasiswa();
  }, [cookies]);
  return (
    <>
      {checkCookies && !loadingtable ? (
        <div className="min-h-screen">
          <header>
            <h1 className="text-2xl font-bold">Data Student</h1>
            <section className="flex justify-between mt-[27px] max-sm:gap-4 items-center">
              <div className="flex gap-3 items-center max-sm:flex-col max-sm:items-start">
                <Filter_Student />
                {/* <Button_Add_Student
                  dataUsersSet={dataUsersSet}
                  dataUsers={dataUsers}
                /> */}
              </div>
              <div className="flex max-md:items-end max-md:flex-col-reverse justify-end gap-4 items-stretch">
                <Search_and_Settings />
              </div>
            </section>
          </header>
          <article className="mt-[25px]">
            <section className="bg-white pb-4">
              <Table_Data_Student />
            </section>
          </article>
        </div>
      ) : loadingtable ? (
        <Loading_Table />
      ) : (
        !checkCookies && (
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
        )
      )}
    </>
  );
}
