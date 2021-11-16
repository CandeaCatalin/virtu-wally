import { createContext, FC, useState } from "react";
import { User } from "../Models/User";
import { APIContext } from "./APIContext";

type ModalsContextType = {
  isDeleteModalOpen: boolean;
  deletedCategoryId: number;
  openCategoryDeleteModal: any;
  setIsDeleteModalOpen: any;
  setDeletedCategoryId: any;
};
// @ts-ignore
export const ModalsContext = createContext<ModalsContextType>(null);

export const ModalsProvider: FC = ({ children }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletedCategoryId, setDeletedCategoryId] = useState(0);
  const openCategoryDeleteModal = (categoryId: number) => {
    setDeletedCategoryId(categoryId);
    setIsDeleteModalOpen(true);
  };
  const ctx: ModalsContextType = {
    isDeleteModalOpen: isDeleteModalOpen,
    deletedCategoryId: deletedCategoryId,
    setDeletedCategoryId: setDeletedCategoryId,
    setIsDeleteModalOpen: setIsDeleteModalOpen,
    openCategoryDeleteModal: openCategoryDeleteModal,
  };
  return (
    <ModalsContext.Provider value={ctx}>{children}</ModalsContext.Provider>
  );
};
