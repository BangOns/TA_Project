import { TableHead } from "@/components/ui/table";
import { ArrowDownUp } from "lucide-react";
import React from "react";

export default function Thead_List_Pelajaran({ item }) {
  return (
    <TableHead className="font-semibold">
      <div className="flex gap-3 items-center text-center ">
        <p className="text-sm"> {item.name}</p>
        <ArrowDownUp width={16} height={16} role="button" />
      </div>
    </TableHead>
  );
}
