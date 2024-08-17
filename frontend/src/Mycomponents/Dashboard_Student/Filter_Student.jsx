import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { ListFilter } from "lucide-react";
import React from "react";
import { Label } from "@/components/ui/label";

export default function Filter_Student() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2 sm:gap-3">
          <ListFilter className="max-sm:w-4 max-sm:h-4" />
          <p className="font-bold max-sm:text-xs ">Filters</p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 sm:w-[213px]">
        <Select>
          <SelectTrigger className="w-full  max-sm:text-xs">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent className="max-sm:text-xs">
            <SelectItem className="max-sm:text-xs" value="light">
              Light
            </SelectItem>
            <SelectItem className="max-sm:text-xs" value="dark">
              Dark
            </SelectItem>
            <SelectItem className="max-sm:text-xs" value="system">
              System
            </SelectItem>
          </SelectContent>
        </Select>
        <Input value="is" disabled className="mt-3 bg-slate-400/50 " />
        <Input placeholder="Enter Condition" className="mt-3 max-sm:text-xs" />
        <Button className="mt-3 w-full bg-red-500 max-sm:py-0 max-sm:px-2 hover:bg-red-700 max-sm:text-xs text-white">
          Add Filter
        </Button>
      </PopoverContent>
    </Popover>
  );
}
