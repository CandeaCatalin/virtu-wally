import { FC, useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { ModalsContext } from "../../Context/ModalsContext";
import "./Modals.css";

interface SettingsModalProps {
  onClose: any;
}

export const SettingsModal: FC<SettingsModalProps> = ({ onClose }) => {
  const appContext = useContext(AppContext);
  const modalsContext = useContext(ModalsContext);
  const [categoryName, setCategoryName] = useState("");
  const onSubmit = async () => {
    const response = await fetch("/api/Category/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        name: categoryName,
        userId: appContext.user.id,
      }),
    });
    const content = await response.json();
    if (content.id !== undefined) {
      appContext.setUser(content);
    }
    modalsContext.setIsAddCategoryModalOpen(false);
  };
  return (
    <div
      id="deleteModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      style={{ position: "relative", top: "15vh" }}
    >
      <div className="modal-dialog">
        <div className="modal-content" style={{ borderRadius: "20px" }}>
          <div className="modal-header">
            {/* <h5
              className="modal-title"
              id="deleteModalLabel"
              style={{ marginLeft: "5%" }}
            >
              Settings
            </h5> */}
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
              <div className="row">
                <div className="form-floating mb-3 col-6">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    style={{ borderRadius: "10px" }}
                    placeholder="Travel"
                    onChange={(e) => {
                      setCategoryName(e.target.value);
                    }}
                  />
                  <label htmlFor="floatingInput">First Name</label>
                </div>
                <div className="form-floating mb-3 col-6">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    style={{ borderRadius: "10px" }}
                    placeholder="Travel"
                    onChange={(e) => {
                      setCategoryName(e.target.value);
                    }}
                  />
                  <label htmlFor="floatingInput">Last Name</label>
                </div>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  style={{ borderRadius: "10px" }}
                  placeholder="Travel"
                  onChange={(e) => {
                    setCategoryName(e.target.value);
                  }}
                />
                <label htmlFor="floatingInput">Email</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingInput"
                  style={{ borderRadius: "10px" }}
                  placeholder="Travel"
                  onChange={(e) => {
                    setCategoryName(e.target.value);
                  }}
                />
                <label htmlFor="floatingInput">Current password</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingInput"
                  style={{ borderRadius: "10px" }}
                  placeholder="Travel"
                  onChange={(e) => {
                    setCategoryName(e.target.value);
                  }}
                />
                <label htmlFor="floatingInput">New password</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingInput"
                  style={{ borderRadius: "10px" }}
                  placeholder="Travel"
                  onChange={(e) => {
                    setCategoryName(e.target.value);
                  }}
                />
                <label htmlFor="floatingInput">Confirm new password</label>
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
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
