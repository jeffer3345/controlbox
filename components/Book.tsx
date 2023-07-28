import React from "react";
import Router from "next/router";
import { BookType } from "../shared";

const Book: React.FC<{ book: BookType }> = ({ book }) => {
  const { authorName, images, description, id, title, categories } = book ?? {};
  

  return (
    <div
      className="cursor-pointer"
      onClick={() => Router.push("/book/[id]", `/book/${id}`)}
    >
      <div className="w-full bg-cover h-64 flex items-center overflow-hidden">
        <img className="w-full" src={images[0]} />
      </div>
      <div className="p-2">
        <h2>{title}</h2>
        <small className="text-gray-400 text-xs">Autor: {authorName}</small>

        <div className="flex mt-2 gap-2 flex-wrap">
          {categories.map((item) => {
            return (
              <p
                key={item.id}
                style={{
                  paddingTop: "0.1em",
                  paddingBottom: "0.3rem",
                }}
                className="text-xs px-3 w-auto bg-gray-700 text-white rounded-full"
              >
                {item.name}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Book;
