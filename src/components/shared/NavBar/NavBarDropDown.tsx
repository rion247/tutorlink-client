import { protectedRoutes } from "@/app/constant";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userLogOut } from "@/services/AuthService";
import { UserRound } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

const NavBarDropDown = ({
  role,
  setIsLoading,
}: {
  role: string;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogOutButton = async () => {
    await userLogOut();
    toast.success("Logout Successfully!!!");
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-transparent border border-neutral-700 text-neutral-700 cursor-pointer">
          <UserRound />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => router.push(`/${role}`)}
            className="cursor-pointer data-highlighted:bg-blue-700 data-highlighted:text-white"
          >
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleLogOutButton}
            className="cursor-pointer data-highlighted:bg-blue-700 data-highlighted:text-white"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default NavBarDropDown;
