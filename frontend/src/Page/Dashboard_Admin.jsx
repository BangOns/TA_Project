import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/datePicker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { TrendingUp } from "lucide-react";
import IconsImport from "@/utils/IconsImport";

import React from "react";
import Card_Dashboard from "@/Mycomponents/Dashboard_Admin/Card_Dashboard";
import Chart_Dashboard from "@/Mycomponents/Dashboard_Admin/Chart_Dashboard";

export default function Dashboard_Admin() {
  return (
    <>
      <section className="w-full flex max-lg:flex-col max-lg:gap-3 justify-between">
        <DatePickerWithRange />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="gap-3  max-lg:max-w-20 bg-white text-black hover:bg-slate-50 ">
              Daily
              <img src={IconsImport.Dropdown} alt="" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
      <article className="w-full grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 place-content-stretch gap-[35px] mt-[45px]">
        <Card_Dashboard
          title={"Total Student"}
          range={"512"}
          icons={IconsImport.TotalStudent}
          persentation={"8,5%"}
        />
        <Card_Dashboard
          title={"Total Certified Students "}
          range={"489"}
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
  );
}
