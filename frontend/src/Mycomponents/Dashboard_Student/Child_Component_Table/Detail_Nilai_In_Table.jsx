import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export default function Detail_Nilai_In_Table({ nilai, kehadiran }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className=" bg-transparent hover:bg-slate-100 py-0 " size="sm">
          <Info color="black" width={15} height={15} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Detail Nilai</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Nilai Keseluruhan : {nilai} </DropdownMenuItem>
        <DropdownMenuItem>Nilai Kehadiran : {kehadiran}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
