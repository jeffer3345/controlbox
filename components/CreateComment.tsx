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
      <form onSubmit={submitData}>
        <h1>Nuevo comentario</h1>

        <textarea
          cols={50}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Comment"
          rows={8}
          value={comment}
        />

        <div>
          Puntuación
          <ol>
            <li>
              <p className="text-white" onClick={() => setScore(1)}>1</p>
            </li>
            <li>
              <p onClick={() => setScore(2)}>2</p>
            </li>
            <li>
              <p onClick={() => setScore(3)}>3</p>
            </li>
            <li>
              <p onClick={() => setScore(4)}>4</p>
            </li>
            <li>
              <p onClick={() => setScore(5)}>5</p>
            </li>
          </ol>
        </div>

        <input disabled={!comment || !score} type="submit" value="Crear" />
      </form>
    </div>
  );
};

export default CreateComment;
