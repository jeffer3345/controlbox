import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Book from "../components/Book";
import prisma from "../lib/prisma";
import { BookType } from "../shared";

export const getStaticProps: GetStaticProps = async () => {
  const books = await prisma.books.findMany({});
  return {
    props: { books },
    revalidate: 10,
  };
};

type Props = {
  books: BookType[];
};

const Blog: React.FC<Props> = (props) => {
  console.log(props);

  return (
    <Layout>
      <div className="page">
        <h1>Lista de libros</h1>
        <main>
          {props.books.map((book) => (
            <div key={book.id} className="book">
              <Book book={book} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default Blog;
