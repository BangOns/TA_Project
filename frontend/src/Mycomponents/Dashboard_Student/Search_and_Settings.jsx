import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SearchContext } from "@/utils/Context";
import { FileSpreadsheet, Search, Settings } from "lucide-react";
import React, { useContext } from "react";
import Button_Settings_Peringkat from "./Child_Component_Settings/Button_Settings_Peringkat";

export default function Search_and_Settings() {
  const { searchDataSet } = useContext(SearchContext);
  return (
    <>
      <div className="flex  items-center gap-2 bg-white border px-[14px]  rounded-lg">
        <Search />
        <Input
          placeholder="Search"
          className="border-none rounded-none ring-0 outline-none focus:outline-none p-0"
          onChange={(e) => searchDataSet(e.target.value)}
        />
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="px-1  md:p-[10px] max-md:w-12 rounded-lg h-full"
          >
            <Settings
              width={24}
              height={24}
              color="black"
              className="max-sm:w-4 max-sm:h-4"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[182px] px-0 right-10">
          <div className=" px-0 space-y-2">
            <Button className="w-full border-0 justify-start" variant="outline">
              <div className="flex gap-3 justify-start">
                <FileSpreadsheet width={20} height={20} />
                <p>Export to excel</p>
              </div>
            </Button>
            <Button_Settings_Peringkat />
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
