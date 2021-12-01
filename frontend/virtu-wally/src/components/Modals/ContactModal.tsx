import React, { FC, useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { ModalsContext } from "../../Context/ModalsContext";
import "./Modals.css";
import headerLogo from "../../Resources/Images/HeaderLogo.svg";
import phoneLogo from "../../Resources/Images/phone.svg";
import locationLogo from "../../Resources/Images/location.svg";
import emailLogo from "../../Resources/Images/email.svg";
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
    modalsContext.setIsContactModalOpen(false);
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
            <img
              src={headerLogo}
              style={{ height: "30vh", width: "100%" }}
              alt={"VirtuWally logo"}
            />
          </div>
          <div className="modal-body">
            <div className="details-div">
              <div style={{ display: "flex" }}>
                <img
                  src={locationLogo}
                  height={"30px"}
                  alt={"location"}
                  style={{ marginTop: "10px", marginRight: "15px" }}
                />
                <div>
                  <h6>Address</h6>
                  <p> Piata Consiliul Europei 2A Timisoara </p>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <img
                  src={phoneLogo}
                  height={"30px"}
                  alt={"location"}
                  style={{ marginTop: "10px", marginRight: "15px" }}
                />
                <div>
                  <h6>Phone</h6>
                  <p>+40 766 430 411</p>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <img
                  src={emailLogo}
                  height={"30px"}
                  alt={"location"}
                  style={{ marginTop: "10px", marginRight: "15px" }}
                />
                <div>
                  <h6>Email</h6>
                  <p>virtuwally@contact.com</p>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn button-modal-prim"
              onClick={() => modalsContext.setIsContactModalOpen(false)}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
