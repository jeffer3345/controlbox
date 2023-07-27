import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import { BookType } from "../shared";

const Post: React.FC<{ book: BookType }> = ({ book }) => {
  const { authorName, images, description, id, title } = book ?? {};

  return (
    <div onClick={() => Router.push("/book/[id]", `/book/${id}`)}>
      <img src={images[0]} />
      <h2>{title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown children={description} />
    </div>
  );
};

export default Post;
