import React, { FC, useContext } from "react";
import { DeleteModal } from "./LeftSideDrawer/Category/DeleteModal";
import { ModalsContext } from "../Context/ModalsContext";

interface ModalsProps {}

export const Modals: FC<ModalsProps> = ({}) => {
  const modalsContext = useContext(ModalsContext);
  return (
    <>
      {modalsContext.isDeleteModalOpen && (
        <div
          style={{
            zIndex: 500,
            position: "absolute",
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0 ,0, 0.3)",
          }}
        >
          <div>
            <DeleteModal
              onClose={() => modalsContext.setIsDeleteModalOpen(false)}
              categoryId={modalsContext.deletedCategoryId}
            />
          </div>
        </div>
      )}
    </>
  );
};
