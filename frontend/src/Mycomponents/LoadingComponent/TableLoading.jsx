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
import Filter_Student from "../Dashboard_Student/Filter_Student";
import Search_and_Settings from "../Dashboard_Student/Search_and_Settings";

export default function Loading_Table() {
  return (
    <>
      <div className="min-h-screen">
        <header>
          <h1 className="text-2xl font-bold">Data Student</h1>
          <section className="flex justify-between mt-[27px] max-sm:gap-4 items-center">
            <div className="flex gap-3 items-center max-sm:flex-col max-sm:items-start">
              <Filter_Student />
            </div>
            <div className="flex max-md:items-end max-md:flex-col-reverse justify-end gap-4 items-stretch">
              <Search_and_Settings />
            </div>
          </section>
        </header>
        <article className="mt-[25px]">
          <section className="bg-white pb-4">
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
                  <TableHead className="font-semibold">...</TableHead>
                  <TableHead className="font-semibold text-center">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <figure>
                      <img
                        src={ImagesImport.ProfileTable}
                        alt=""
                        className="rounded-full w-10 h-10"
                      />
                    </figure>
                  </TableCell>
                  <TableCell>...</TableCell>
                  <TableCell>...</TableCell>

                  <TableCell>...</TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <p>...</p>
                      <p>...</p>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </section>
        </article>
      </div>
    </>
  );
}
