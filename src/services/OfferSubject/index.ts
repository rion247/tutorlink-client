"use server";

import getValidToken from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createOfferSubject = async (data: FieldValues) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/offered-subjects/create-offered-subject`,
      {
        method: "POST",
        headers: { Authorization: token, "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );

    revalidateTag("OfferSubjects", "");

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const updateOfferSubject = async (id: string, data: FieldValues) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/offered-subjects/${id}`,
      {
        method: "PATCH",
        headers: { Authorization: token, "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );
    revalidateTag("OfferSubjects", "");

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllOfferSubject = async (page?: string, limit?: string) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/offered-subjects?limit=${limit}&page=${page}`,
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

export const getSingleOfferSubject = async (id: string) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/offered-subjects/${id}`,
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

export const deleteOfferSubject = async (id: string) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/offered-subjects/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: token },
      },
    );

    revalidateTag("OfferSubjects", "");

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};
