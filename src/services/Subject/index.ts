"use server";

import getValidToken from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createSubject = async (data: FieldValues) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/subjects/create-subject`,
      {
        method: "POST",
        headers: { Authorization: token, "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );

    revalidateTag("Subjects", "");

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const updateSubject = async (id: string, data: FieldValues) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/subjects/${id}`,
      {
        method: "PATCH",
        headers: { Authorization: token, "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );
    revalidateTag("Subjects", "");

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const updateSubjectStatus = async (id: string, data: FieldValues) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/subjects/update/${id}`,
      {
        method: "PATCH",
        headers: { Authorization: token, "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );

    revalidateTag("Subjects", "");

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllSubject = async (page?: string, limit?: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/subjects?limit=${limit}&page=${page}`,
      {
        method: "GET",
        next: { tags: ["Subjects"] },
      },
    );

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getSingleSubject = async (id: string) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/subjects/${id}`,
      {
        method: "GET",
        headers: { Authorization: token },
        next: { tags: ["Subjects"] },
      },
    );

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteSubject = async (id: string) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/subjects/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: token },
      },
    );

    revalidateTag("Subjects", "");

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};
