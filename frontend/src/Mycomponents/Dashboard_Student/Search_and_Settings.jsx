import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ListHeadTable from "@/utils/List_Head_Table";
import { Search, Settings } from "lucide-react";
import React from "react";

export default function Search_and_Settings() {
  return (
    <>
      <div className="flex  items-center gap-2 bg-white border px-[14px]  rounded-lg">
        <Search />
        <Input
          placeholder="Search"
          className="border-none rounded-none ring-0 outline-none focus:outline-none p-0"
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
        <PopoverContent className="w-[182px] right-10">
          <div className=" px-[9px]">
            {ListHeadTable.map((item, index) => (
              <div className="flex py-2 gap-2" key={index}>
                <Checkbox id={item} />
                <label
                  htmlFor={item}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {item}
                </label>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
