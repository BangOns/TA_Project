import { GetDataMahasiswaContext } from "@/utils/Context";
import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConvertDataToExcel } from "@/helper/Convert_Data_To_Excel";
import XLSX from "xlsx";
export default function Button_Export_Data_to_Excel() {
  const [open, openSet] = useState(false);
  const { GetDataMahasiswaByContext } = useContext(GetDataMahasiswaContext);
  async function ExportDataToExcel() {
    const ConvertData = ConvertDataToExcel(GetDataMahasiswaByContext);
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(ConvertData);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "Data_Mahasiswa.xlsx");
    openSet(false);
  }

  return (
    <Dialog open={open} onOpenChange={openSet}>
      <DialogTrigger asChild>
        <Button className="w-full border-0 justify-start" variant="outline">
          <div className="flex gap-3 justify-start">
            <FileSpreadsheet width={20} height={20} />
            Export to Excel
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader className={"pb-[14px]  "}>
          <DialogTitle className="px-6">Data Mahasiswa</DialogTitle>
        </DialogHeader>
        <section className="w-full px-3">
          <header className="text-sm text-center">
            <h1>Apakah data sudah sesuai?</h1>
            <p>Jika sudah maka tekan tombol Export</p>
          </header>
          <section className="flex justify-center gap-3 mt-4">
            <Button
              className="bg-orange-300 hover:bg-orange-400 text-white"
              size="sm"
              onClick={() => openSet(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-400 text-white"
              size="sm"
              onClick={() => ExportDataToExcel()}
            >
              Export
            </Button>
          </section>
        </section>
      </DialogContent>
    </Dialog>
  );
}
