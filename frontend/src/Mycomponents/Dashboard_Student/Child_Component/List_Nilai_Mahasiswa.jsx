import { TableCell } from "@/components/ui/table";
import React from "react";
import Detail_Nilai_In_Table from "../Detail_Nilai_In_Table";
export default function TableCell_List_Nilai_Mahasiswa({ user }) {
  let ElementListNilai = null;
  if (user.data_pelajaran.length !== 0) {
    const SortingDataPelajaranByName = user.data_pelajaran.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    ElementListNilai = SortingDataPelajaranByName.map((pelajaran, index) => {
      return (
        <TableCell key={index}>
          <div className="flex items-center justify-start ">
            <p className="text-sm font-bold">{pelajaran.Total_nilai}</p>
            <Detail_Nilai_In_Table
              nilai={pelajaran.nilai}
              kehadiran={pelajaran.kehadiran}
            />
          </div>
        </TableCell>
      );
    });
  } else {
    ElementListNilai = <TableCell>No Data</TableCell>;
  }
  return <>{ElementListNilai}</>;
}
