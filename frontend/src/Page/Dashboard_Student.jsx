import React, { useContext } from "react";
import Button_Add_Student from "@/Mycomponents/Dashboard_Student/Button_Add_Student";
import Table_Data_Student from "@/Mycomponents/Dashboard_Student/Table_Data_Student";
import Search_and_Settings from "@/Mycomponents/Dashboard_Student/Search_and_Settings";
import { CheckCookiesValid, getDataMahasiswa } from "@/utils/GetData";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Loading_Table from "@/Mycomponents/LoadingComponent/TableLoading";
import { SearchX } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  GetDataMahasiswaBySearch,
  GetDataMahasiswaBySort,
  GetDataMahasiswaBySortAndSearch,
} from "@/helper/Search_And_Sorting_Data_Mahasiswa";
import { SearchContext, SortContext } from "@/utils/Context";
import Button_Add_Pelajaran from "@/Mycomponents/Dashboard_Student/Button_Add_Pelajaran";
export default function Dashboard_Student() {
  const cookies = Cookies.get("token");
  const { sortCategory } = useContext(SortContext);
  const { searchData } = useContext(SearchContext);

  const { data: detectedCookies, isLoading: LoadingDetectedCookies } = useQuery(
    {
      queryKey: ["detected"],
      queryFn: async () => await CheckCookiesValid(cookies),
      enabled: !!cookies,
    }
  );

  const { data: dataMahasiswa, isLoading: LoadingDataMahasiswa } = useQuery({
    queryKey: ["tablemahasiswa"],
    queryFn: async () => await getDataMahasiswa(cookies),
    enabled: !LoadingDetectedCookies && detectedCookies.status === 200,
    select: (data) => {
      if (sortCategory.length !== 0 && searchData.length !== 0) {
        return GetDataMahasiswaBySortAndSearch(data, sortCategory, searchData);
      } else if (sortCategory.length !== 0) {
        return GetDataMahasiswaBySort(data, sortCategory);
      } else if (searchData.length !== 0) {
        return GetDataMahasiswaBySearch(data, searchData);
      } else {
        return data;
      }
    },
  });
  return (
    <>
      {!LoadingDetectedCookies &&
      detectedCookies.status === 200 &&
      !LoadingDataMahasiswa ? (
        <div className="min-h-screen">
          <header>
            <h1 className="text-2xl font-bold">Data Student</h1>
            <section className="flex justify-between mt-[27px] max-sm:gap-4 items-center">
              <div className="flex gap-3 items-center max-sm:flex-col max-sm:items-start">
                <Button_Add_Pelajaran />
                <Button_Add_Student />
              </div>
              <div className="flex max-md:items-end max-md:flex-col-reverse justify-end gap-4 items-stretch">
                <Search_and_Settings />
              </div>
            </section>
          </header>
          <article className="mt-[25px]">
            <section
              className={`${dataMahasiswa.length !== 0 && "bg-white pb-4"} `}
            >
              {dataMahasiswa.length !== 0 ? (
                <Table_Data_Student dataMahasiswa={dataMahasiswa} />
              ) : (
                <div className="text-center py-5 flex gap-4 justify-center ">
                  <SearchX />
                  <p>Data Not Found</p>
                </div>
              )}
            </section>
          </article>
        </div>
      ) : LoadingDetectedCookies || LoadingDataMahasiswa ? (
        <Loading_Table />
      ) : (
        detectedCookies.response.status === 401 && (
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
