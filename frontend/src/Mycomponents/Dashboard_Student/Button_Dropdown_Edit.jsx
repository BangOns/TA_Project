import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import Button_Edit_Student from "./Button_Edit_Student";
import Button_Edit_Nilai from "./Button_Edit_Nilai";

export default function Button_Dropdown_Edit({ id }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-transparent group hover:bg-orange-500" size="sm">
          <Pencil
            role="button"
            className=" w-5 h-5 text-amber-500 group-hover:text-white"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 sm:w-48 px-1 space-y-1 py-2 bg-white dark:bg-slate-800 text-sm">
        <Button_Edit_Student dataUserById={id} />
        <Button_Edit_Nilai dataUserById={id} />
      </PopoverContent>
    </Popover>
  );
}
