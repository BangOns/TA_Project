import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import ImagesImport from "@/utils/ImagesImport";

import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { getDataPelajaran } from "@/utils/GetData";
import Button_Dropdown_Edit from "./Child_Component_Table/Button_Dropdown_Edit";
import Thead_List_Pelajaran from "./Child_Component_Table/List_Pelajaran";
import TableCell_List_Nilai_Mahasiswa from "./Child_Component_Table/List_Nilai_Mahasiswa";
import Button_Delete_Student from "./Child_Component_Table/Button_Delete_Student";

export default function Table_Data_Student({ dataMahasiswa }) {
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
        <Pagination>
          <PaginationContent className="px-2">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                className={" border font-semibold text-black"}
              />
            </PaginationItem>
            <div className="flex justify-center gap-2">
              <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive={true}
                  className={"active:bg-red-500"}
                >
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </div>
            <PaginationItem>
              <PaginationNext
                href="#"
                className={" border font-semibold text-black"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </TableCaption>
      <TableHeader>
        <TableRow className="bg-slate-300 text-white">
          <TableHead className="font-semibold">Profil</TableHead>
          <TableHead className="font-semibold">Name</TableHead>
          <TableHead className="font-semibold">NPM</TableHead>
          {!isLoading &&
            theadPelajaran &&
            theadPelajaran.map((item, index) => (
              <Thead_List_Pelajaran key={index} item={item} />
            ))}
          <TableHead className="font-semibold text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataMahasiswa.length !== 0 ? (
          dataMahasiswa.map((user, index) => (
            <TableRow key={index}>
              <TableCell>
                <figure>
                  <img
                    src={ImagesImport.ProfileTable}
                    alt=""
                    className="rounded-full w-10 h-10"
                  />
                </figure>
              </TableCell>
              <TableCell>
                <p className="text-sm font-bold">{user.name}</p>
              </TableCell>
              <TableCell>
                <p className="text-sm font-bold">{user.npm}</p>
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
