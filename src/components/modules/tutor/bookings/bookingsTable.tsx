"use client";

import { Button } from "@/components/ui/button";
import TLTable from "@/components/ui/core/TLTable";
import { updateBookingStatus } from "@/services/Booking";
import { IBooking } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import Swal from "sweetalert2";

export type TBookingTable = Pick<
  IBooking,
  | "student"
  | "offeredSubject"
  | "bookingStatus"
  | "paymentStatus"
  | "isDelivered"
  | "_id"
  | "subject"
>;

export const columns: ColumnDef<TBookingTable>[] = [
  {
    accessorKey: "studentName",
    header: () => <div>Student Name</div>,
    cell: ({ row }) => {
      return <p className="">{row.original.student.fullName}</p>;
    },
  },
  {
    accessorKey: "subjectName",
    header: () => <div>Subject Name</div>,
    cell: ({ row }) => {
      return <p className="">{row.original.subject.name}</p>;
    },
  },
  {
    accessorKey: "bookingStatus",
    header: () => <div>Booking Status</div>,
    cell: ({ row }) => {
      return (
        <div>
          {row.original.bookingStatus === "pending" ? (
            <p className="text-yellow-500 border bg-yellow-100 w-14 text-center px-1 rounded">
              Pending
            </p>
          ) : row.original.bookingStatus === "confirmed" ? (
            <p className="text-green-500 border bg-green-100 w-14 text-center px-1 rounded">
              Pending
            </p>
          ) : (
            <p className="text-red-500 border bg-red-100 w-14 text-center px-1 rounded">
              Active
            </p>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "paymentStatus",
    header: () => <div>Payment Status</div>,
    cell: ({ row }) => {
      return (
        <div>
          {row.original.paymentStatus === "paid" ? (
            <p className="text-green-500 border bg-green-100 w-14 text-center px-1 rounded">
              Paid
            </p>
          ) : (
            <p className="text-red-500 border bg-red-100 w-14 text-center px-1 rounded">
              Unpaid
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
      const handleDeliveryButton = async (id: string) => {
        const toastId = toast.loading("Loading...");

        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delivered it!",
        });

        if (result.isConfirmed) {
          try {
            const res = await updateBookingStatus(id);

            if (res.success) {
              Swal.fire({
                title: "Delivered Successfully",
                text: "The booking has been marked as delivered.",
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
          {row.original.isDelivered ? (
            <p className="text-green-500 border bg-green-100 w-14 text-center px-1 rounded">
              Delivered
            </p>
          ) : (
            <Button
              type="button"
              className="cursor-pointer bg-red-700"
              size={"lg"}
              onClick={() => handleDeliveryButton(row.original._id)}
            >
              Complete Delivery
            </Button>
          )}
        </div>
      );
    },
  },
];

const MyBookingsTableComponent = ({ bookings }: { bookings: IBooking[] }) => {
  return <TLTable columns={columns} data={bookings} />;
};

export default MyBookingsTableComponent;
