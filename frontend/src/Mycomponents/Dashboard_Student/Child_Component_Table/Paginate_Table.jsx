import React, { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
export default function Paginate_Table({ dataMahasiswa, dataMahasiswaSet }) {
  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 2;
  const totalPages = Math.ceil(dataMahasiswa.length / limitPerPage);
  const listPages = Array.from({ length: totalPages }, (_, index) => index + 1);
  function getPaginatedData() {
    const startIndex = (currentPage - 1) * limitPerPage;
    const endIndex = startIndex + limitPerPage;
    dataMahasiswaSet(dataMahasiswa.slice(startIndex, endIndex));
  }
  useEffect(() => {
    getPaginatedData();
  }, [currentPage, dataMahasiswa, dataMahasiswaSet]);
  return (
    <Pagination>
      <PaginationContent className="px-2">
        <PaginationItem>
          <Button
            className={" border font-semibold text-black hover:bg-red-300 "}
            variant="outline"
            disabled={currentPage <= 1 ? true : false}
            onClick={() =>
              setCurrentPage(
                currentPage >= totalPages ? currentPage - 1 : currentPage
              )
            }
          >
            Previous
          </Button>
        </PaginationItem>
        <div className="flex justify-center gap-2">
          {listPages ? (
            listPages.map((pages, index) => (
              <PaginationItem key={index}>
                <Button
                  className={`${
                    currentPage === pages
                      ? "bg-red-500 text-white"
                      : "bg-transparent text-black"
                  } hover:bg-red-300  `}
                  onClick={() => setCurrentPage(pages)}
                >
                  {pages}
                </Button>
              </PaginationItem>
            ))
          ) : (
            <></>
          )}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        </div>
        <PaginationItem>
          <Button
            className={" border font-semibold text-black hover:bg-red-300 "}
            variant="outline"
            disabled={currentPage >= totalPages - 1 ? true : false}
            onClick={() =>
              setCurrentPage(
                currentPage < totalPages ? currentPage + 1 : totalPages
              )
            }
          >
            Next
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
