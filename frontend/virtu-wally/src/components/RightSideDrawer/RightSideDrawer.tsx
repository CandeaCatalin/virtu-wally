import React, { useContext } from "react";

import "./RightSideDrawer.css";
import { AppContext } from "../../Context/AppContext";
import { APIContext } from "../../Context/APIContext";
import { Avatar } from "@mui/material";
import { ModalsContext } from "../../Context/ModalsContext";

const RightSideDrawer = () => {
  const appContext = useContext(AppContext);
  const apiContext = useContext(APIContext);
  const modalsContext = useContext(ModalsContext);
  const onImageChange = (file: any) => {};
  return (
    <nav className="right-side-drawer">
      <div className="user-image-1 ">
        <div
          className="user-image center"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {appContext.user.imageUrl.length !== 0 ? (
            <Avatar
              alt="CC"
              sx={{ width: 56, height: 56 }}
              src={"data:image/png;base64," + appContext.user.imageUrl}
            />
          ) : (
            <Avatar sx={{ width: 56, height: 56 }}>
              {appContext.user.firstName[0] + appContext.user.lastName[0]}
            </Avatar>
          )}
          <input
            type={"file"}
            className="file-upload-avatar"
            onChange={(e) => onImageChange(e.target.files?.[0])}
          />
        </div>
      </div>
      <div className=" details">
        <p className=" details-name">
          {appContext.user.firstName + " " + appContext.user.lastName}
        </p>
        <p className=" details-email"> {appContext.user.email}</p>
      </div>
      <ul>
        <li>
          <div
            className=" right-list"
            onClick={() => modalsContext.setIsSettingsModalOpen(true)}
          >
            Settings
          </div>
        </li>
        <li>
          <div
            className="right-list"
            onClick={() => modalsContext.setIsContactModalOpen(true)}
          >
            Contact Us
          </div>
        </li>
      </ul>

      <div className="button-signOut" onClick={apiContext.signOut}>
        Sign Out
      </div>
    </nav>
  );
};

export default RightSideDrawer;
