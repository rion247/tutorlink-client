import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

type TUserRole = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  admin: [/^\/admin/],
  tutor: [/^\/tutor/],
  student: [/^\/student/],
};

const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const userInfo = await getCurrentUser();

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `${process.env.NEXT_PUBLIC_CLIENT_API}/login?redirectPath=${pathname}`,
          request.url,
        ),
      );
    }
  }

  if (
    userInfo &&
    userInfo?.role &&
    roleBasedPrivateRoutes[userInfo?.role as TUserRole]
  ) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as TUserRole];

    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }
  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: ["/admin", "/admin/:id", "/tutor", "/student"],
};

export default middleware;
