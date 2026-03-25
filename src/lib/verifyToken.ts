"use server";

import { getNewAccessToken } from "@/services/AuthService";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

const isTokenExpired = async (token: string) => {
  if (!token) {
    return true;
  }

  try {
    const decoded: { exp: number } = jwtDecode(token);

    return decoded.exp * 1000 < Date.now();
  } catch (error: any) {
    console.log(error);
    return true;
  }
};

const getValidToken = async (): Promise<string> => {
  const cookieStore = await cookies();

  let token = cookieStore.get("accessToken")!.value;

  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewAccessToken();
    token = data?.accessToken;
    cookieStore.set("accessToken", token);
  }

  return token;
};

export default getValidToken;
