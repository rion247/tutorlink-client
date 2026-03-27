"use server";

import getValidToken from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createBooking = async (data: FieldValues) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/bookings/create-booking`,
      {
        method: "POST",
        headers: { Authorization: token, "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );

    revalidateTag("Bookings", "");

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const updateBookingStatus = async (id: string) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/bookings/change-delivered-status/${id}`,
      {
        method: "PATCH",
        headers: { Authorization: token },
      },
    );
    revalidateTag("Bookings", "");

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllBooking = async (page?: string, limit?: string) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/bookings?limit=${limit}&page=${page}`,
      {
        method: "GET",
        headers: { Authorization: token },
        next: { tags: ["Bookings"] },
      },
    );

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getMyBooking = async () => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/bookings/get-my-booking`,
      {
        method: "GET",
        headers: { Authorization: token },
        next: { tags: ["Bookings"] },
      },
    );

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getSingleBooking = async (id: string) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/bookings/${id}`,
      {
        method: "GET",
        headers: { Authorization: token },
        next: { tags: ["OfferSubjects"] },
      },
    );

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};
