import { Doc } from "./Doc";
import { Category } from "./Category";

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  id: number;
  createdTime: Date;
  docs: Doc[];
  categories: Category[];
};
