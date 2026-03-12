"use server";

import { JwtPayload } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

interface TDecodedUser extends JwtPayload {
  userEmail: string;
  role: string;
  iat: number;
  exp: number;
}

export const StudentRegistration = async (userData: FormData) => {
  const cookieStore = await cookies();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/create-student`,
      { method: "POST", body: userData },
    );

    const result = await res.json();

    if (result?.success) {
      cookieStore.set("accessToken", result?.data?.accessToken);
      cookieStore.set("refreshToken", result?.data?.refreshToken);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const TutorRegistration = async (userData: FormData) => {
  const cookieStore = await cookies();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/create-tutor`,
      { method: "POST", body: userData },
    );

    const result = await res.json();

    if (result?.success) {
      cookieStore.set("accessToken", result?.data?.accessToken);
      cookieStore.set("refreshToken", result?.data?.refreshToken);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const UserLogIn = async (userData: FieldValues) => {
  const cookieStore = await cookies();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();

    if (result?.success) {
      cookieStore.set("accessToken", result?.data?.accessToken);
      cookieStore.set("refreshToken", result?.data?.refreshToken);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  let decoded = null;

  if (accessToken) {
    decoded = jwtDecode(accessToken) as TDecodedUser;

    return decoded;
  } else {
    return null;
  }
};

export const verifyGoogleRecaptcha = async (token: string) => {
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: process.env.NEXT_PUBLIC_SECRET_KEY as string,
        response: token,
      }),
    });

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const userLogOut = async () => {
  const cookiesStore = await cookies();

  cookiesStore.delete("accessToken");
};

export const getNewAccessToken = async () => {
  const cookiesStore = await cookies();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          Authorization: cookiesStore.get("refreshToken")!.value,
          "Content-Type": "application/json",
        },
      },
    );

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};
