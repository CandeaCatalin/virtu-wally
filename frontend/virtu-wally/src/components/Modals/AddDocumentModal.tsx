import { FC, useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { ModalsContext } from "../../Context/ModalsContext";
import "./Modals.css";

interface AddDocumentModalProps {
  onClose: any;
}

export const AddDocumentModal: FC<AddDocumentModalProps> = ({ onClose }) => {
  const appContext = useContext(AppContext);
  const modalsContext = useContext(ModalsContext);
  const [DocumentName, setDocumentName] = useState("");
  const onSubmit = async () => {
    const response = await fetch("/api/Document/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        name: DocumentName,
        userId: appContext.user.id,
      }),
    });
    const content = await response.json();
    if (content.id !== undefined) {
      appContext.setUser(content);
    }
    modalsContext.setIsAddDocumentModalOpen(false);
  };
  return (
    <div
      id="deleteModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      style={{ position: "relative", top: "20vh" }}
    >
      <div className="modal-dialog">
        <div className="modal-content" style={{ borderRadius: "20px" }}>
          <div className="modal-header">
            <h5 className="modal-title" id="deleteModalLabel">
              Add a new Document
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
            <form>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  style={{ borderRadius: "10px" }}
                  placeholder="Travel"
                  onChange={(e) => {
                    setDocumentName(e.target.value);
                  }}
                />
                <label htmlFor="floatingInput">Document Name</label>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn button-modal-sec"
              data-bs-dismiss="modal"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn button-modal-prim"
              onClick={onSubmit}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
