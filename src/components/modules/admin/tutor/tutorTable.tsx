"use client";

import { ITutor } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import TLTable from "@/components/ui/core/TLTable";
import { toast } from "sonner";
import { tutorApproval } from "@/services/Tutor";

export type TTutorTable = Pick<
  ITutor,
  | "fullName"
  | "averageRating"
  | "isApproved"
  | "bio"
  | "profileImage"
  | "isDeleted"
  | "id"
>;

export const columns: ColumnDef<TTutorTable>[] = [
  {
    accessorKey: "fullName",
    header: () => <div>Email</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original.profileImage}
            alt={row.original.fullName}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <span className="truncate">{row.original.fullName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "bio",
    header: () => <div>Tutor Bio</div>,
    cell: ({ row }) => {
      return <p className="">{row.original.bio}</p>;
    },
  },
  {
    accessorKey: "averageRating",
    header: () => <div>Rating</div>,
    cell: ({ row }) => {
      return <p className="">{row.original.averageRating}</p>;
    },
  },
  {
    accessorKey: "isDeleted",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      return (
        <div>
          {row.original.isDeleted ? (
            <p className="text-red-500 border bg-red-100 w-14 text-center px-1 rounded">
              Inactive
            </p>
          ) : (
            <p className="text-green-500 border bg-green-100 w-14 text-center px-1 rounded">
              Active
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
      const handleApprovedButton = async (id: string) => {
        const toastId = toast.loading("Loading...");

        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, approve it!",
        });

        if (result.isConfirmed) {
          try {
            const res = await tutorApproval(id);

            if (res.success) {
              Swal.fire({
                title: "Approved!",
                text: "Tutor Request has been approved.",
                icon: "success",
              });
              toast.success(res?.message, {
                id: toastId,
              });
            } else {
              toast.error(res?.message || "Something went wrong!!!", {
                id: toastId,
              });
            }
          } catch (err: any) {
            toast.error(err?.message || "Something went wrong!!!", {
              id: toastId,
            });
          }
        } else {
          toast.warning("Canceled", { id: toastId });
        }
      };
      return (
        <div>
          {row.original.isApproved ? (
            <p>Approved</p>
          ) : (
            <Button
              type="button"
              className="cursor-pointer bg-red-700"
              size={"lg"}
              onClick={() => handleApprovedButton(row.original.id)}
            >
              Approval Pending
            </Button>
          )}
        </div>
      );
    },
  },
];

const TutorTableComponent = ({ tutors }: { tutors: ITutor[] }) => {
  return <TLTable columns={columns} data={tutors} />;
};

export default TutorTableComponent;
