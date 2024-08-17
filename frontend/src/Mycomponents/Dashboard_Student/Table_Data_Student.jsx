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
import ListHeadTable from "@/utils/List_Head_Table";
import { ArrowDownUp, Trash2 } from "lucide-react";
import Button_Edit_Student from "./Button_Edit_Student";
import { Button } from "@/components/ui/button";

export default function Table_Data_Student({ dataUsers, dataUsersSet }) {
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
          {ListHeadTable.map((item, index) => (
            <TableHead className="font-semibold  ">
              <div className="flex gap-3 items-center text-center ">
                <p className="text-sm"> {item}</p>
                <ArrowDownUp width={16} height={16} role="button" />
              </div>
            </TableHead>
          ))}
          <TableHead className="font-semibold text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataUsers ? (
          dataUsers.map((user, index) => (
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
                <p className="text-sm font-bold">{user.fullname}</p>
              </TableCell>
              <TableCell>
                <p className="text-sm font-bold">{user.email}</p>
              </TableCell>
              <TableCell>
                <p className="text-sm font-bold">{user.phoneNumber} </p>
              </TableCell>
              <TableCell>
                <p className="text-sm font-bold">{user.instance} </p>
              </TableCell>
              <TableCell>
                <p className="text-sm font-bold">{user.createdAt} </p>
              </TableCell>
              <TableCell>
                <div className="flex justify-center">
                  <Button
                    className="bg-transparent  group hover:bg-red-500 "
                    size="sm"
                    onClick={() =>
                      dataUsersSet(
                        dataUsers.filter((item) => item.id !== user.id)
                      )
                    }
                  >
                    <Trash2
                      role="button"
                      className=" w-5 h-5 text-red-500 group-hover:text-white"
                      width={20}
                      height={20}
                    />
                  </Button>
                  <Button_Edit_Student
                    dataUserById={user}
                    DataUsers={dataUsers}
                    DataUsersSet={dataUsersSet}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <></>
        )}
      </TableBody>
    </Table>
  );
}
