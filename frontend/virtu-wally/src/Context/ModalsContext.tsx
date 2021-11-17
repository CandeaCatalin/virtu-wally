import { createContext, FC, useState } from "react";
import { User } from "../Models/User";
import { APIContext } from "./APIContext";

type ModalsContextType = {
  isDeleteModalOpen: boolean;
  isAddCategoryModalOpen: boolean;
  deletedCategoryId: number;
  openCategoryDeleteModal: any;
  setIsDeleteModalOpen: any;
  setDeletedCategoryId: any;
  setIsAddCategoryModalOpen: any;
};
// @ts-ignore
export const ModalsContext = createContext<ModalsContextType>(null);

export const ModalsProvider: FC = ({ children }) => {
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] =
    useState(false);
  const [deletedCategoryId, setDeletedCategoryId] = useState(0);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const openCategoryDeleteModal = (categoryId: number) => {
    setDeletedCategoryId(categoryId);
    setIsDeleteCategoryModalOpen(true);
  };
  const ctx: ModalsContextType = {
    isDeleteModalOpen: isDeleteCategoryModalOpen,
    deletedCategoryId: deletedCategoryId,
    setDeletedCategoryId: setDeletedCategoryId,
    setIsDeleteModalOpen: setIsDeleteCategoryModalOpen,
    openCategoryDeleteModal: openCategoryDeleteModal,
    isAddCategoryModalOpen: isAddCategoryModalOpen,
    setIsAddCategoryModalOpen: setIsAddCategoryModalOpen,
  };
  return (
    <ModalsContext.Provider value={ctx}>{children}</ModalsContext.Provider>
  );
};
