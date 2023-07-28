import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import prisma from "../../lib/prisma";
import { BookType } from "../../shared";
import { parseISO, format } from "date-fns";
import CreateComment from "../../components/CreateComment";
import { useSession } from "next-auth/react";
import CommentItem from "../../components/comments";

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
      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              {title}
            </h1>
            <p className="dark:text-white">
              Autor {authorName || "Unknown author"}
            </p>
            <div className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              <ReactMarkdown children={description} />
            </div>
            <div className="flex gap-2 flex-wrap max-w-sm">
              {categories.map((item) => {
                return (
                  <button
                    key={item.id}
                    className="relative flex items-center  text-sm py-1 px-1 overflow-hidden border rounded-lg border-green-500 bg-green-500 text-white shadow-2xl transition-all  hover:shadow-green-500 "
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
            <div>
              {comments.map((item) => {
                return <CommentItem key={item.id} {...item} />;
              })}
            </div>
            <div className="my-4">
              <CreateComment bookId={id} />
            </div>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex rounded-lg border-radius:4.5rem h-3/6">
            <img style={{height:"500px"}} src={images[0]} className="rounded-lg" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Book;
