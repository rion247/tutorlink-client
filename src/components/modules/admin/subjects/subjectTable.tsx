"use client";

import { Button } from "@/components/ui/button";
import TLTable from "@/components/ui/core/TLTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ISubject } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import EditSubjectModal from "./editSubjectModal";
import UpdateSubjectStatusModal from "./updateSubjectStatusModal";
import TablePagination from "@/components/ui/core/TLTable/TablePagination";
import { TMeta } from "@/types/meta";

export type TSubjectTable = Pick<
  ISubject,
  "name" | "category" | "gradeLevel" | "isActive" | "_id"
>;

export const columns: ColumnDef<TSubjectTable>[] = [
  {
    accessorKey: "name",
    header: () => <div>Subject Name</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-3">
          <span className="truncate">{row.original.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: () => <div>Category</div>,
    cell: ({ row }) => {
      return <p className="">{row.original.category}</p>;
    },
  },
  {
    accessorKey: "gradeLevel",
    header: () => <div>Grade Level</div>,
    cell: ({ row }) => {
      return <p className="">{row.original.gradeLevel}</p>;
    },
  },
  {
    accessorKey: "isActive",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      return (
        <div>
          {row.original.isActive ? (
            <p className="text-green-500 border bg-green-100 w-14 text-center px-1 rounded">
              Active
            </p>
          ) : (
            <p className="text-red-500 border bg-red-100 w-14 text-center px-1 rounded">
              Inactive
            </p>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: () => <div>Action</div>,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
              <span className="sr-only ">Open menu</span>
              <MoreHorizontal className="h-4 w-4 " />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuSeparator />

            <EditSubjectModal
              id={row.original._id}
              subjectData={row.original as ISubject}
            />
            <UpdateSubjectStatusModal id={row.original._id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const SubjectTable = ({
  subjects,
  meta,
}: {
  subjects: ISubject[];
  meta: TMeta;
}) => {
  return (
    <div>
      <TLTable columns={columns} data={subjects} />
      <TablePagination totalPage={meta?.totalPage} />
    </div>
  );
};

export default SubjectTable;
