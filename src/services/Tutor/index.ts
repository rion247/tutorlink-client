"use server";

import getValidToken from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

export const getAllTutorForAdmin = async () => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/tutors/all-tutor`,
      {
        method: "GET",
        headers: { Authorization: token },
        next: { tags: ["AllTutor"] },
      },
    );

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const tutorApproval = async (id: string) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/admin/tutor-approval/${id}`,
      {
        method: "PATCH",
        headers: { Authorization: token },
      },
    );
    revalidateTag("AllTutor", "");

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};
