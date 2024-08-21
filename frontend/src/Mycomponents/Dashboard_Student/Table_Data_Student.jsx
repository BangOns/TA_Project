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
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { getDataMahasiswa, getDataPelajaran } from "@/utils/GetData";
import Button_Dropdown_Edit from "./Button_Dropdown_Edit";
import Thead_List_Pelajaran from "./Child_Component/List_Pelajaran";
import TableCell_List_Nilai_Mahasiswa from "./Child_Component/List_Nilai_Mahasiswa";

export default function Table_Data_Student() {
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
  const { data: dataMahasiswa, isLoading: loadingUser } = useQuery({
    queryKey: ["tablemahasiswa"],
    queryFn: async () => getDataMahasiswa(cookies),
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
        {!loadingUser && dataMahasiswa ? (
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
                  <Button
                    className="bg-transparent  group hover:bg-red-500 "
                    size="sm"
                    onClick={() => {}}
                  >
                    <Trash2
                      role="button"
                      className=" w-5 h-5 text-red-500 group-hover:text-white"
                      width={20}
                      height={20}
                    />
                  </Button>
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
