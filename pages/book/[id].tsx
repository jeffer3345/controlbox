import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import prisma from "../../lib/prisma";
import { BookType } from "../../shared";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const book = await prisma.books.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      comments: {
        include: {
          user: {},
        },
      },
    },
  });
  return {
    props: book,
  };
};
const Book: React.FC<BookType> = (props) => {
  const { title, authorName, comments, description, images } = props ?? {};
  console.log(props);

  return (
    <Layout>
      <div>
        <img src={images[0]} />
        <h2>{title}</h2>
        <p>By {authorName || "Unknown author"}</p>
        <ReactMarkdown children={description} />
        {comments.map((item) => {
          const { score, comment, user } = item ?? {};
          const { name, image } = user ?? {};

          return (
            <div>
              <img
                className="relative inline-block h-12 w-12 rounded-full border-2 border-white object-cover object-center hover:z-10 focus:z-10"
                src={image}
              />
              <p>Score: {score}</p>
              <p>Comment: {comment}</p>
              <p>By: {name}</p>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Book;
