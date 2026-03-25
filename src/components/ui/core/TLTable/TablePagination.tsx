"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../../button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const TablePagination = ({ totalPage }: { totalPage: number }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();
  const pathname = usePathname();

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      router.push(`${pathname}?page=${currentPage - 1}`);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
      router.push(`${pathname}?page=${currentPage + 1}`);
    }
  };

  return (
    <div className="flex items-center gap-2 my-5">
      <Button
        className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
        size={"sm"}
        variant={"outline"}
        disabled={currentPage === 1}
        onClick={handlePrev}
      >
        <ArrowLeft />
      </Button>
      {[...Array(totalPage)].map((_, index) => (
        <Button
          onClick={() => {
            setCurrentPage(index + 1);
            router.push(`${pathname}?page=${index + 1}`);
          }}
          key={index}
          variant={currentPage === index + 1 ? "default" : "outline"}
          size={"sm"}
          className="cursor-pointer"
        >
          {index + 1}
        </Button>
      ))}
      <Button
        onClick={handleNext}
        disabled={currentPage === totalPage}
        variant={"outline"}
        size={"sm"}
        className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
      >
        <ArrowRight />
      </Button>
    </div>
  );
};

export default TablePagination;
