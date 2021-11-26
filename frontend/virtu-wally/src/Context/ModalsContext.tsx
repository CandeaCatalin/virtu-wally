import { createContext, FC, useState } from "react";
import { User } from "../Models/User";
import { APIContext } from "./APIContext";

type ModalsContextType = {
  isDeleteModalOpen: boolean;
  isAddCategoryModalOpen: boolean;
  isAddDocumentModalOpen: boolean;
  isEditDocumentModalOpen: boolean;
  isSettingsModalOpen: boolean;
  isContactModalOpen: boolean;
  isAddDocumentModalOpen: boolean;
  deletedCategoryId: number;
  openCategoryDeleteModal: any;
  setIsDeleteModalOpen: any;
  setIsAddDocumentModalOpen: any;
  setDeletedCategoryId: any;
  setIsAddCategoryModalOpen: any;
  setIsAddDocumentModalOpen: any;
  setIsEditDocumentModalOpen: any;
  setIsSettingsModalOpen: any;
  setIsContactModalOpen: any;
};
// @ts-ignore
export const ModalsContext = createContext<ModalsContextType>(null);

export const ModalsProvider: FC = ({ children }) => {
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] =
    useState(false);

  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isAddDocumentModalOpen, setIsAddDocumentModalOpen] = useState(false);
  const [isEditDocumentModalOpen, setIsEditDocumentModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [deletedCategoryId, setDeletedCategoryId] = useState(0);
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
    isAddDocumentModalOpen: isAddDocumentModalOpen,
    isEditDocumentModalOpen: isEditDocumentModalOpen,
    isSettingsModalOpen: isSettingsModalOpen,
    setIsAddCategoryModalOpen: setIsAddCategoryModalOpen,
    setIsAddDocumentModalOpen: setIsAddDocumentModalOpen,
    setIsEditDocumentModalOpen: setIsEditDocumentModalOpen,
    setIsSettingsModalOpen: setIsSettingsModalOpen,
    isContactModalOpen: isContactModalOpen,
    setIsContactModalOpen: setIsContactModalOpen,
    setIsAddDocumentModalOpen: setIsAddDocumentModalOpen,
    isAddDocumentModalOpen: isAddDocumentModalOpen,
  };
  return (
    <ModalsContext.Provider value={ctx}>{children}</ModalsContext.Provider>
  );
};
