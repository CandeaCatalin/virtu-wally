import React, { FC, useContext } from "react";
import { DeleteCategoryModal } from "./Modals/DeleteCategoryModal";
import { ModalsContext } from "../Context/ModalsContext";
import { AddCategoryModal } from "./Modals/AddCategoryModal";
import { AddDocumentModal } from "./Modals/AddDocumentModal";
import { EditDocumentModal } from "./Modals/EditDocumentModal";
import { ContactModal } from "./Modals/ContactModal";
import { SettingsModal } from "./Modals/SettingsModal";

interface ModalsProps {}

export const Modals: FC<ModalsProps> = ({}) => {
  const modalsContext = useContext(ModalsContext);
  return (
    <>
      {(modalsContext.isDeleteModalOpen ||
        modalsContext.isAddCategoryModalOpen ||
        modalsContext.isAddDocumentModalOpen ||
        modalsContext.isEditDocumentModalOpen ||
        modalsContext.isSettingsModalOpen ||
        modalsContext.isContactModalOpen) && (
        <div
          style={{
            zIndex: 500,
            position: "absolute",
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0 ,0, 0.3)",
          }}
        >
          {modalsContext.isDeleteModalOpen && (
            <div>
              <DeleteCategoryModal
                onClose={() => modalsContext.setIsDeleteModalOpen(false)}
                categoryId={modalsContext.deletedCategoryId}
              />
            </div>
          )}
          {modalsContext.isAddCategoryModalOpen && (
            <div>
              <AddCategoryModal
                onClose={() => modalsContext.setIsAddCategoryModalOpen(false)}
              />
            </div>
          )}
          {modalsContext.isAddDocumentModalOpen && (
            <div>
              <AddDocumentModal
                onClose={() => modalsContext.setIsAddDocumentModalOpen(false)}
              />
            </div>
          )}
          {modalsContext.isEditDocumentModalOpen && (
            <div>
              <EditDocumentModal
                onClose={() => modalsContext.setIsEditDocumentModalOpen(false)}
              />
            </div>
          )}
          {modalsContext.isSettingsModalOpen && (
            <div>
              <SettingsModal
                onClose={() => modalsContext.setIsSettingsModalOpen(false)}
              />
            </div>
          )}
          {modalsContext.isContactModalOpen && (
            <div>
              <ContactModal
                onClose={() => modalsContext.setIsContactModalOpen(false)}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};
