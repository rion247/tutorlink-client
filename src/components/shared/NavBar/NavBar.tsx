"use client";
import Link from "next/link";
import logoImage from "../../../app/assets/svgs/logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import NavBarDropDown from "./NavBarDropDown";

const NavBar = () => {
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();

  const links = [
    { linkName: "Home", linkHref: "/" },
    { linkName: "About", linkHref: "/about" },
    { linkName: "Offered Subject", linkHref: "/offered-subject" },
    { linkName: "Contact Us", linkHref: "/contact-us" },
  ];

  const navLinks = links.map((link, index) => (
    <Link
      key={index}
      className={`${pathname === link.linkHref ? "bg-blue-700 text-white font-semibold" : "text-neutral-500 bg-transparent font-normal"} rounded px-4 xl:px-6 py-3`}
      href={link.linkHref}
    >
      {link.linkName}
    </Link>
  ));

  return (
    <div className="navbar shadow-sm container mx-auto py-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow "
          >
            {navLinks}
          </ul>
        </div>
        <Link href={"/"} className="hidden lg:flex">
          <div className="flex flex-row justify-center items-center gap-2 lg:gap-3 xl:gap-4">
            <Image
              src={logoImage}
              alt="Logo image is loading"
              className="w-8 h-8 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12"
            />

            <h6 className="text-blue-500 text-xl lg:text-2xl font-extrabold tracking-wider">
              Tutor<span className="text-red-500">Link</span>
            </h6>
          </div>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div>
            <NavBarDropDown role={user?.role} setIsLoading={setIsLoading} />
          </div>
        ) : (
          <div>
            <Link
              href="/login"
              className="btn bg-green-600 rounded-full text-white p-4"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="btn bg-blue-600 rounded-full text-white p-4"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
