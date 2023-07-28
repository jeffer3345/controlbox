import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import UserProfileActions from "./UserProfileActions";

const UserProfile = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handlerMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  if (status === "loading") {
    <div className="right">
      <p>Validando la sesión ...</p>
    </div>;
  }

  if (!session) {
    return (
      <div>
        <div className="inline-flex items-center h-full ml-5 lg:w-2/5 lg:justify-end lg:ml-0">
          <Link href="/api/auth/signin">
            <a
              className="pt-1 ml-2 font-bold text-xs text-white"
              data-active={isActive("/signup")}
            >
              Ingresar
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => handlerMenuOpen()}
      >
        <div className="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
          <img src={session.user.image} alt="profilepic" />
        </div>
        <span className="pt-1 ml-2 font-bold text-xs text-white">{session.user.name}</span>
      </div>

      <UserProfileActions
        menuOpen={menuOpen}
        handlerMenuOpen={handlerMenuOpen}
      />
    </div>
  );
};

export default UserProfile;
