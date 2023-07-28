import React from "react";
import { useSearchContext } from "../../shared/providers/SearchProvider";
import { useRouter } from "next/router";

export const SearchBar = () => {
  const { criterial, setCriterial } = useSearchContext();
  const router = useRouter();

  
  if (router.route !== "/") {
    return null;
  }

  return (
    <div className="relative w-96">
      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-500 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
      <input
        onChange={(event) => setCriterial(event.target.value)}
        type="search"
        id="default-search"
        className="block p-4 pl-10 w-full text-sm text-white-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-white-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Busca un libro en especifico"
        value={criterial}
        required
      />
    </div>
  );
};
