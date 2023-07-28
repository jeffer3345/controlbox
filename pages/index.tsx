import React, { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Book from "../components/Book";
import prisma from "../lib/prisma";
import { BookType } from "../shared";
import { useSearchContext } from "../shared/providers/SearchProvider";

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
  const { criterial } = useSearchContext();
  const [filterBooks, setFilterBooks] = useState(props.books);

  useEffect(() => {
    if (criterial) {
      setFilterBooks(
        props.books.filter((item) => {
          // Filtra por nombre
          const byName = item.title
            .toLowerCase()
            .includes(criterial.toLowerCase());

          if (byName) {
            return byName;
          }

          // Filtra por categoria del libro
          const byCategory = item.categories.filter((category) =>
            category.name.toLowerCase().includes(criterial.toLowerCase())
          );

          if (byCategory.length) {
            return item;
          }

          // Filtra por autor
          const byAuthor = item.authorName
            .toLowerCase()
            .includes(criterial.toLowerCase());

          if (byAuthor) {
            return byAuthor;
          }
        })
      );
    } else {
      setFilterBooks(props.books);
    }
  }, [criterial, props]);

  return (
    <Layout>
      <div className="p-4">
        <h1 className="mb-4 text-dark dark:text-white text-xl">
          Lista de libros
        </h1>
        <main className="flex gap-3 flex-wrap justify-center">
          {!filterBooks.length && (
            <div className="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
              <p className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-500 mt-4">
                No hay resultados
              </p>
              <p className="text-gray-500 mt-4 pb-4  text-center">
                Prueba buscando por autor, categoría del libro o el nombre
              </p>
            </div>
          )}
          {filterBooks.map((book) => (
            <div
              key={book.id}
              className="rounded overflow-hidden border w-full lg:w-1/6 md:w-6/12 bg-white dark:bg-gray-200 mx-3 md:mx-0 lg:mx-0"
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
