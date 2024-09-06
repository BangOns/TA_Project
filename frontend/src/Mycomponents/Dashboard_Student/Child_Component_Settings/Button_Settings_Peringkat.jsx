import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { SortDataByTotalNilai } from "@/helper/Search_And_Sorting_Data_Mahasiswa";
import TableCell_List_Nilai_Mahasiswa from "../Child_Component_Table/List_Nilai_Mahasiswa";
import Thead_List_Pelajaran from "../Child_Component_Table/List_Pelajaran";
import {
  GetDataMahasiswaContext,
  GetDataPelajaranContext,
} from "@/utils/Context";
import { BgColorForPeringkat } from "@/helper/BgColor_For_Peringkat";

export default function Button_Settings_Peringkat() {
  const [open, openSet] = useState(false);
  const { GetDataPelajaranByContext } = useContext(GetDataPelajaranContext);
  const { GetDataMahasiswaByContextSet } = useContext(GetDataMahasiswaContext);
  const cookies = Cookies.get("token");
  const { data: dataMahasiswa } = useQuery({
    queryKey: ["tablemahasiswa"],
    queryFn: async () => await getDataMahasiswa(cookies),
    select: (data) => {
      return SortDataByTotalNilai(data);
    },
  });
  useEffect(() => {
    if (dataMahasiswa.length !== 0) {
      GetDataMahasiswaByContextSet(dataMahasiswa);
    }
  }, [dataMahasiswa]);
  return (
    <Dialog open={open} onOpenChange={openSet}>
      <DialogTrigger asChild>
        <Button className="w-full border-0 justify-start" variant="outline">
          <div className="flex gap-3">
            <Trophy width={20} height={20} />
            <p>Peringkat</p>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className={"pb-[14px]  "}>
          <DialogTitle className="px-6">Peringkat</DialogTitle>
        </DialogHeader>
        <div className="w-full px-3">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-300 text-white">
                <TableHead className="font-semibold">No</TableHead>
                <TableHead className="font-semibold">Name</TableHead>
                {GetDataPelajaranByContext.map((item, index) => (
                  <Thead_List_Pelajaran key={index} item={item} />
                ))}
                <TableHead className="font-semibold">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataMahasiswa.length !== 0 ? (
                dataMahasiswa.map((user, index) => (
                  <TableRow
                    key={index}
                    className={`${BgColorForPeringkat(index + 1)}`}
                  >
                    <TableCell>
                      <p className="text-sm font-bold">{(index += 1)}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm font-bold">{user.name}</p>
                    </TableCell>

                    <TableCell_List_Nilai_Mahasiswa user={user} />
                    <TableCell>
                      <p className="text-sm font-bold">
                        {user.rata_rata_nilai}
                      </p>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  {!isLoading && theadPelajaran && (
                    <TableCell
                      colSpan={theadPelajaran.length + 3}
                      className="text-center"
                    >
                      Data Not Found
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
