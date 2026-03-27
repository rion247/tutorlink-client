"use client";

import TLTable from "@/components/ui/core/TLTable";
import TablePagination from "@/components/ui/core/TLTable/TablePagination";
import { IOfferSubject, TMeta } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import EditOfferSubjectModal from "./editOfferSubjectModal";

export type TOfferSubjectTable = Pick<
  IOfferSubject,
  | "subject"
  | "day"
  | "startTime"
  | "endTime"
  | "duration"
  | "pricePerHour"
  | "maxCapacity"
  | "currentlyBooked"
  | "isActive"
  | "_id"
>;

export const columns: ColumnDef<TOfferSubjectTable>[] = [
  {
    accessorKey: "subjectName",
    header: () => <div>Subject Name</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-3">
          <span className="truncate">{row.original.subject.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "day",
    header: () => <div>Day</div>,
    cell: ({ row }) => {
      return <p className="">{row.original.day}</p>;
    },
  },
  {
    accessorKey: "startTime",
    header: () => <div>Start Time</div>,
    cell: ({ row }) => {
      return <p className="">{row.original.startTime}</p>;
    },
  },
  {
    accessorKey: "endTime",
    header: () => <div>End Time</div>,
    cell: ({ row }) => {
      return <p className="">{row.original.endTime}</p>;
    },
  },
  {
    accessorKey: "duration",
    header: () => <div>Duration</div>,
    cell: ({ row }) => {
      return <p className="">{row.original.duration}</p>;
    },
  },
  {
    accessorKey: "pricePerHour",
    header: () => <div>Price Per Hour</div>,
    cell: ({ row }) => {
      return <p className="">{row.original.pricePerHour}</p>;
    },
  },
  {
    accessorKey: "maxCapacity",
    header: () => <div>Max Capacity</div>,
    cell: ({ row }) => {
      return <p className="">{row.original.maxCapacity}</p>;
    },
  },
  {
    accessorKey: "currentlyBooked",
    header: () => <div>Booked</div>,
    cell: ({ row }) => {
      return <p className="">{row.original.currentlyBooked}</p>;
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
        <div>
          <EditOfferSubjectModal
            id={row.original._id}
            offerSubjectData={row.original as IOfferSubject}
          />
        </div>
      );
    },
  },
];

const OfferSubjectTable = ({
  offerSubjects,
  meta,
}: {
  offerSubjects: IOfferSubject[];
  meta: TMeta;
}) => {
  return (
    <div>
      <TLTable columns={columns} data={offerSubjects} />
      <TablePagination totalPage={meta?.totalPage} />
    </div>
  );
};

export default OfferSubjectTable;
