import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import IconsImport from "@/utils/IconsImport";

import React from "react";
import Button_Logout from "./Button_Logout";

export default function Button_DropDown_Navbar() {
  return (
    <Popover>
      <PopoverTrigger>
        <img
          src={IconsImport.Dropdown}
          alt=""
          width={21}
          height={20}
          className="w-5 h-5"
        />
      </PopoverTrigger>
      <PopoverContent className="w-40 sm:w-48 px-1 space-y-1 py-2 bg-white dark:bg-slate-800 text-sm">
        <Button_Logout />
      </PopoverContent>
    </Popover>
  );
}
