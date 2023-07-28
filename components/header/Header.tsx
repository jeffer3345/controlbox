import { useRouter } from "next/router";
import React from "react";
import UserProfile from "./UserProfile";
import Link from "next/link";
import { SearchBar } from "./SearchBar";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  return (
    <header className="w-full text-gray-700 bg-white dark:bg-gray-700 shadow-sm body-font">
      <div className=" flex flex-col flex-wrap items-center justify-between p-5 w-full md:flex-row">
        <nav className="flex flex-wrap items-center text-base ">
          <Link href="/">
            <a
              data-active={isActive("/")}
              className="mr-5 font-medium hover:text-gray-900 dark:text-white cursor-pointer"
            >
              Inicio
            </a>
          </Link>
        </nav>
      
        <SearchBar />
        <UserProfile />
      </div>
    </header>
  );
};

export default Header;
