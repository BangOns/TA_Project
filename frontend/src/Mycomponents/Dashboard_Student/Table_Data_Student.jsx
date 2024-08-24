import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { getDataPelajaran } from "@/utils/GetData";
import Button_Dropdown_Edit from "./Child_Component_Table/Button_Dropdown_Edit";
import Thead_List_Pelajaran from "./Child_Component_Table/List_Pelajaran";
import TableCell_List_Nilai_Mahasiswa from "./Child_Component_Table/List_Nilai_Mahasiswa";
import Button_Delete_Student from "./Child_Component_Table/Button_Delete_Student";
import Paginate_Table from "./Child_Component_Table/Paginate_Table";
import { useEffect, useState } from "react";

export default function Table_Data_Student({ dataMahasiswa }) {
  const [DataAllMahasiswa, DataAllMahasiswaSet] = useState([]);
  const cookies = Cookies.get("token");
  const { data: theadPelajaran, isLoading } = useQuery({
    queryKey: ["tablepelajaran"],
    queryFn: async () => getDataPelajaran(cookies),
    select: (data) => {
      return data.data.sort((pelajaranA, pelajaranB) =>
        pelajaranA.name.localeCompare(pelajaranB.name)
      );
    },
  });

  return (
    <Table>
      <TableCaption>
        <Paginate_Table
          dataMahasiswa={dataMahasiswa}
          dataMahasiswaSet={DataAllMahasiswaSet}
        />
      </TableCaption>
      <TableHeader>
        <TableRow className="bg-slate-300 text-white">
          <TableHead className="font-semibold">NPM</TableHead>
          <TableHead className="font-semibold">Name</TableHead>
          {!isLoading &&
            theadPelajaran &&
            theadPelajaran.map((item, index) => (
              <Thead_List_Pelajaran key={index} item={item} />
            ))}
          <TableHead className="font-semibold text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {DataAllMahasiswa.length !== 0 ? (
          DataAllMahasiswa.map((user, index) => (
            <TableRow key={index}>
              <TableCell>
                <p className="text-sm font-bold">{user.npm.substring(0, 4)}</p>
              </TableCell>
              <TableCell>
                <p className="text-sm font-bold">{user.name}</p>
              </TableCell>

              <TableCell_List_Nilai_Mahasiswa user={user} />
              <TableCell>
                <div className="flex justify-center">
                  <Button_Delete_Student id={user._id} />
                  <Button_Dropdown_Edit id={user._id} />
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell>...</TableCell>
            <TableCell>...</TableCell>
            <TableCell>...</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
