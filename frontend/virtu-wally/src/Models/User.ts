import {Doc} from "./Doc";

export type User = {
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: File | undefined;
    id: number;
    createdTime: Date;
    docs: Doc[];
}
