import { Doc } from "./Doc";

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  id: number;
  createdTime: Date;
  docs: Doc[];
};
