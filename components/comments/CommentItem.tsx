import React from "react";
import { parseISO, format } from "date-fns";
import { CommentType } from "../../shared";

const CommentItem: React.FC<CommentType> = ({
  score,
  comment,
  user,
  createdAt,
}) => {
  const { name, image } = user;
  const date = parseISO(createdAt);

  return (
    <>
      <div className="my-4"></div>
      <div className="flex flex-col gap-1 bg-gray-700 p-4 rounded-md">
        <div className="flex justify justify-between">
          <div className="flex gap-2">
            <img
              className="relative inline-block h-10 w-15 rounded-full border-88 border-white object-cover object-center hover:z-10 focus:z-10 "
              src={image}
              alt="User Avatar"
            />
            <span className="text-white"> {name}</span>
          </div>
        </div>

        <div className="text-white">Comentario: {comment}</div>

        <div className="flex justify-between text-white">
          <span className="text-xs">
            Creado el:{" "}
            <time dateTime={createdAt}>{format(date, "LLLL d, yyyy")}</time>;
          </span>
          <div className="flex justify-center items-center">
            <div className="flex items-center mt-2 mb-4">
              <svg
                className={`mx-1 w-4 h-4 fill-current  ${
                  score >= 1 ? "text-yellow-500" : "text-gray-400"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <svg
                className={`mx-1 w-4 h-4 fill-current  ${
                  score >= 2 ? "text-yellow-500" : "text-gray-400"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <svg
                className={`mx-1 w-4 h-4 fill-current  ${
                  score >= 3 ? "text-yellow-500" : "text-gray-400"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <svg
                className={`mx-1 w-4 h-4 fill-current  ${
                  score >= 4 ? "text-yellow-500" : "text-gray-400"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <svg
                className={`mx-1 w-4 h-4 fill-current  ${
                  score >= 5 ? "text-yellow-500" : "text-gray-400"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentItem;
