import { signOut } from "next-auth/react";
import React from "react";

const UserProfileActions = ({
  menuOpen,
  handlerMenuOpen,
}: {
  menuOpen: boolean;
  handlerMenuOpen: () => void;
}) => {
  if (!menuOpen) {
    return null;
  }

  return (
    <div className="block absolute" style={{ left: "-40px", top: "38px" }}>
      <div className="bg-white w-40 border border-gray-300 rounded-lg flex flex-col text-sm py-2 px-2 text-gray-500 shadow-lg">
        <div className="flex items-end justify-end text-gray-900 cursor-pointer">
          <span className="text-xs mb-1" onClick={() => handlerMenuOpen()}>
            <svg
              width="15px"
              height="15px"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#fff"
                d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
              />
            </svg>
          </span>
        </div>
        <div className="flex hover:bg-gray-100 py-1 px-2 rounded cursor-pointer">
          <p className="text-xs">Mi cuenta</p>
        </div>
        <div
          className="flex hover:bg-gray-100 py-1 px-2 rounded cursor-pointer"
          onClick={() => signOut()}
        >
          <p className="text-xs">Cerrar sesión</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileActions;
