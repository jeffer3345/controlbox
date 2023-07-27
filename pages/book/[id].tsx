import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import prisma from "../../lib/prisma";
import { BookType } from "../../shared";
import { parseISO, format } from "date-fns";
import CreateComment from "../../components/CreateComment";
import { useSession } from "next-auth/react";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const book = await prisma.books.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      categories: {},
      comments: {
        include: {
          book: {},
          user: {},
        },
        orderBy: {
          createdAt: "desc", // Ordenar los comentarios por fecha de creación (más recientes primero)
        },
      },
    },
  });

  const comments = book.comments.map((comment) => {
    return {
      ...comment,
      createdAt: comment.createdAt.toISOString(),
    };
  });

  const formattedBookData = {
    ...book,
    comments,
  };

  return {
    props: formattedBookData,
  };
};

const Book: React.FC<BookType> = (props) => {
  const { data: session, status } = useSession();
  console.log(session, status);

  const { title, authorName, comments, description, images, categories, id } =
    props ?? {};
  console.log(props);

  return (
    <Layout>
      <div>
        <img src={images[0]} />
        <h2>{title}</h2>
        <p>By {authorName || "Unknown author"}</p>
        <ReactMarkdown children={description} />
        <h2>Categorias: </h2>
        {categories.map((item) => {
          return (
            <div>
              <p>{item.name}</p>
            </div>
          );
        })}

        {comments.map((item) => {
          const { score, comment, user, createdAt } = item ?? {};
          const { name, image } = user ?? {};
          const date = parseISO(createdAt);

          return (
            <div>
              <img
                className="relative inline-block h-12 w-12 rounded-full border-2 border-white object-cover object-center hover:z-10 focus:z-10"
                src={image}
              />
              <p>
                createAt:{" "}
                <time dateTime={createdAt}>{format(date, "LLLL d, yyyy")}</time>
                ;
              </p>
              <p>Score: {score}</p>
              <p>Comment: {comment}</p>
              <p>By: {name}</p>
            </div>
          );
        })}
        <CreateComment bookId={id} />
      </div>
    </Layout>
  );
};

export default Book;
