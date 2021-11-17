import React, { FC, useContext } from "react";
import { DeleteCategoryModal } from "./Modals/DeleteCategoryModal";
import { ModalsContext } from "../Context/ModalsContext";
import { AddCategoryModal } from "./Modals/AddCategoryModal";

interface ModalsProps {}

export const Modals: FC<ModalsProps> = ({}) => {
  const modalsContext = useContext(ModalsContext);
  return (
    <>
      {(modalsContext.isDeleteModalOpen ||
        modalsContext.isAddCategoryModalOpen) && (
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
        </div>
      )}
    </>
  );
};
