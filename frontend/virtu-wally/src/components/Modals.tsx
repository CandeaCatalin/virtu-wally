import React, { FC, useContext } from "react";
import { DeleteModal } from "./LeftSideDrawer/Category/DeleteModal";
import { ModalsContext } from "../Context/ModalsContext";

interface ModalsProps {}

export const Modals: FC<ModalsProps> = ({}) => {
  const modalsContext = useContext(ModalsContext);
  return (
    <>
      {modalsContext.isDeleteModalOpen && (
        <DeleteModal
          onClose={() => modalsContext.setIsDeleteModalOpen(false)}
          categoryId={modalsContext.deletedCategoryId}
        />
      )}
    </>
  );
};
