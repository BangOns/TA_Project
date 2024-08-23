import { TableHead } from "@/components/ui/table";
import { SortContext } from "@/Mycomponents/Container_Dashboard";
import { ArrowDownUp } from "lucide-react";
import React, { useContext } from "react";

export default function Thead_List_Pelajaran({ item }) {
  const { sortCategorySet } = useContext(SortContext);

  return (
    <TableHead className="font-semibold">
      <div className="flex gap-3 items-center text-center ">
        <p className="text-sm"> {item.name}</p>
        <ArrowDownUp
          width={16}
          height={16}
          role="button"
          onClick={() => sortCategorySet(item.name)}
        />
      </div>
    </TableHead>
  );
}
