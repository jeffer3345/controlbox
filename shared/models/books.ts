import { UserType } from "./user";

export type CommentType = {
  id: string;
  comment: string;
  score: number;
  userId: string;
  bookId: string;
  user: UserType;
  createdAt: string;
};

export type BookType = {
  id: string;
  title: string;
  description: string;
  images: string[];
  authorName: string;
  comments: CommentType[];
  categories: CategoriesType[];
};

export type CategoriesType = {
  id: string;
  name: string;
};
