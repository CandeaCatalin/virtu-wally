import { FC, useContext } from "react";
import { AppContext } from "../../../Context/AppContext";
import { ModalsContext } from "../../../Context/ModalsContext";

interface DeleteModalProps {
  onClose: any;
  categoryId: number;
}

export const DeleteModal: FC<DeleteModalProps> = ({ onClose, categoryId }) => {
  const appContext = useContext(AppContext);
  const modalsContext = useContext(ModalsContext);
  const onDelete = async () => {
    const response = await fetch("/api/Category/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        userId: appContext.user.id,
        categoryId: categoryId,
      }),
    });
    const content = await response.json();
    if (content.id !== undefined) {
      appContext.setUser(content);
    }
    modalsContext.setIsDeleteModalOpen(false);
    modalsContext.setDeletedCategoryId(0);
  };
  return (
    <div
      id="exampleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Confirm Deletion
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            />
          </div>
          <div className="modal-body">
            Are you sure you want to delete the category?
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
