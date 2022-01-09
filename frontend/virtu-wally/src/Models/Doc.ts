import {Category} from "./Category";

export type Doc = {
    name: string;
    userId: number;
    uploadedDate: Date;
    category: Category;
    categoryId: number;
    id: number;
    fileData: string;
}
