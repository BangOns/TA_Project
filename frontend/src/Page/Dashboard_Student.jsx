import { Input } from "@/components/ui/input";
import Button_Add_Student from "@/Mycomponents/Dashboard_Student/Button_Add_Student";
import Filter_Student from "@/Mycomponents/Dashboard_Student/Filter_Student";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import ListHeadTable from "@/utils/List_Head_Table";
import Table_Data_Student from "@/Mycomponents/Dashboard_Student/Table_Data_Student";
import Search_and_Settings from "@/Mycomponents/Dashboard_Student/Search_and_Settings";
import DataUser from "@/utils/DataUser";
export default function Dashboard_Student() {
  const [dataUsers, dataUsersSet] = useState([]);
  useEffect(() => {
    if (dataUsers.length === 0) {
      dataUsersSet([...DataUser]);
    }
  }, [dataUsers]);
  return (
    <div className="min-h-screen">
      <header>
        <h1 className="text-2xl font-bold">Data Student</h1>
        <section className="flex justify-between mt-[27px] max-sm:gap-4 items-center">
          <div className="flex gap-3 items-center max-sm:flex-col max-sm:items-start">
            <Filter_Student />
            <Button_Add_Student
              dataUsersSet={dataUsersSet}
              dataUsers={dataUsers}
            />
          </div>
          <div className="flex max-md:items-end max-md:flex-col-reverse justify-end gap-4 items-stretch">
            <Search_and_Settings />
          </div>
        </section>
      </header>
      <article className="mt-[25px]">
        <section className="bg-white pb-4">
          <Table_Data_Student
            dataUsers={dataUsers}
            dataUsersSet={dataUsersSet}
          />
        </section>
      </article>
    </div>
  );
}
