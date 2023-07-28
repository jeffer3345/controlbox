import { useSession } from "next-auth/react";
import React, { useState } from "react";

const CreateComment: React.FC<{ bookId: string }> = ({ bookId }) => {
  const [score, setScore] = useState(0);
  const [comment, setComment] = useState("");
  const { data: session, status } = useSession();

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log({ bookId });
    try {
      const body = { score, comment, bookId, email: session.user.email };
      await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
    // TODO
    // You will implement this next ...
  };

  if (status !== "authenticated") {
    return null;
  }

  return (
    <div>
      <div className="flex max-auto items-center justify-center shadow-lg mt-10  mb-4 max-w-lg">
        <form
          onSubmit={submitData}
          className="w-full max-auto bg-white pb-2 rounded-lg px-4 pt-2"
        >
          <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
            Deja tú comentario
          </h2>
          <div className="w-full md:w-full px-3 mb-2 mt-2">
            <textarea
              className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
              name="comment"
              placeholder="Ingresa tú comentario"
              required
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            ></textarea>
          </div>

          <div className="w-full md:w-full px-3 mb-2 mt-2">
            <h2 className="pt-1 pb-1 text-gray-900 font-bold  text-xs ">
              Valora este libro
            </h2>
            <div className="flex items-center mt-2 mb-4">
              <svg
                onClick={() => setScore(1)}
                className={`ml-0 mx-1 w-4 h-4 fill-current cursor-pointer  ${
                  score >= 1 ? "text-yellow-500" : "text-gray-400"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <svg
                onClick={() => setScore(2)}
                className={`mx-1 w-4 h-4 fill-current cursor-pointer  ${
                  score >= 2 ? "text-yellow-500" : "text-gray-400"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <svg
                onClick={() => setScore(3)}
                className={`mx-1 w-4 h-4 fill-current cursor-pointer  ${
                  score >= 3 ? "text-yellow-500" : "text-gray-400"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <svg
                onClick={() => setScore(4)}
                className={`mx-1 w-4 h-4 fill-current cursor-pointer  ${
                  score >= 4 ? "text-yellow-500" : "text-gray-400"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <svg
                onClick={() => setScore(5)}
                className={`mx-1 w-4 h-4 fill-current cursor-pointer  ${
                  score >= 5 ? "text-yellow-500" : "text-gray-400"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            </div>
          </div>

          <div className="w-full md:w-full flex items-end justify-end md:w-full px-3">
            <div className="-mr-1">
              <input
                disabled={!comment || !score}
                type="submit"
                value="Crear"
                className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateComment;
