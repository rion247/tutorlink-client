"use client";

import * as React from "react";
import {
  BookOpen,
  BookOpenText,
  LayoutDashboard,
  LogOut,
  LucideIcon,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import Logo from "@/components/shared/Logo";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { userLogOut } from "@/services/AuthService";
import { usePathname, useRouter } from "next/navigation";
import { protectedRoutes } from "@/app/constant";

type TNavItems = {
  title: string;
  url: string;
};

type TNavRoute = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: TNavItems[];
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, setIsLoading } = useUser();

  const role = user?.role;

  let navRoute: TNavRoute[] = [];

  if (role === "admin") {
    navRoute = [
      {
        title: "Dashboard",
        url: "/admin",
        icon: LayoutDashboard,
        isActive: true,
      },
      {
        title: "Tutor",
        url: "#",
        icon: Users,
        isActive: true,
        items: [
          {
            title: "Request Approval",
            url: "/admin/tutor",
          },
        ],
      },
      {
        title: "Subject",
        url: "#",
        icon: BookOpen,
        isActive: true,
        items: [
          {
            title: "All Subject",
            url: "/admin/subjects",
          },
        ],
      },
    ];
  }

  if (role === "tutor") {
    navRoute = [
      {
        title: "Dashboard",
        url: "/tutor",
        icon: LayoutDashboard,
        isActive: true,
      },

      {
        title: "Offered Subject",
        url: "#",
        icon: BookOpenText,
        isActive: true,
        items: [
          {
            title: "All Offered Subject",
            url: "/tutor/offer-subjects",
          },
        ],
      },
    ];
  }

  const data = {
    navMain: navRoute,
  };

  const router = useRouter();
  const pathname = usePathname();

  const handleLogOutButton = async () => {
    try {
      await userLogOut();
      if (protectedRoutes.some((route) => pathname.match(route))) {
        router.push("/login");
      }
      setIsLoading(true);
      toast.success("Logout Successful!!!");
    } catch (err: any) {
      toast.error("Something went wrong!!!");
      console.log(err);
    }
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="">
        <div className="group-data-[collapsible=icon]:hidden ">
          <Logo />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <Button
          onClick={handleLogOutButton}
          size={"sm"}
          className="bg-red-500 text-white cursor-pointer group-data-[collapsible=icon]:hidden "
        >
          <LogOut />
          Logout
        </Button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
