import { FC, useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { ModalsContext } from "../../Context/ModalsContext";
import "./Modals.css";

interface ContactModalProps {
  onClose: any;
}

export const ContactModal: FC<ContactModalProps> = ({ onClose }) => {
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
      style={{ position: "relative", top: "10vh" }}
    >
      <div className="modal-dialog">
        <div className="modal-content" style={{ borderRadius: "20px" }}>
          <div className="modal-header">
            {/* <h5
              className="modal-title"
              id="deleteModalLabel"
              style={{ marginLeft: "5%" }}
            >
              Contact us
            </h5> */}
            {/* <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            /> */}
          </div>
          <div className="modal-body">
            <div className="details-div">
              <h6>Address</h6>
              <p> Piata Consiliul Europei 2A Timisoara </p>
              <h6>Phone</h6>
              <p>+40 766 430 411</p>
              <h6>Email</h6>
              <p>virtuwally@contact.com</p>
            </div>
            <div className="div-line" />
            <form>
              <div className="send-message-div">
                <h5> Send us a message </h5>
              </div>
              <div className="form-floating mb-3">
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
                <label htmlFor="floatingInput">Enter your name</label>
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
                <label htmlFor="floatingInput">Enter your email</label>
              </div>
              <div className="form-floating mb-3">
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
                <label htmlFor="floatingInput">Enter your message</label>
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
