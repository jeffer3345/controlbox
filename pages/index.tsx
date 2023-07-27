import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Book from "../components/Book";
import prisma from "../lib/prisma";
import { BookType } from "../shared";

export const getStaticProps: GetStaticProps = async () => {
  const books = await prisma.books.findMany({
    include: {
      categories: {},
      comments: {},
    },
  });

  const formattedBookData = books.map((item) => {
    const comments = item.comments.map((comment) => {
      return {
        ...comment,
        createdAt: comment.createdAt.toISOString(),
      };
    });
    return { ...item, comments };
  });

  console.log(formattedBookData);

  return {
    props: { books: formattedBookData },
    revalidate: 10,
  };
};

type Props = {
  books: BookType[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="p-4">
        <h1 className="mb-4">Lista de libros</h1>
        <main className="flex gap-3 flex-wrap justify-center">
          {props.books.map((book) => (
            <div
              key={book.id}
              className="rounded overflow-hidden border w-full lg:w-1/6 md:w-6/12 bg-white mx-3 md:mx-0 lg:mx-0"
            >
              <Book book={book} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default Blog;
