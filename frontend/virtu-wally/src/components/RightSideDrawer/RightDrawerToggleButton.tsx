import React, { FC, useContext } from "react";
import "./RightDrawerToggleButton.css";
import { Avatar } from "@mui/material";
import { AppContext } from "../../Context/AppContext";

interface rightDrawerToggleButtonProps {
  onClick: any;
}

const RightDrawerToggleButton: FC<rightDrawerToggleButtonProps> = ({
  onClick,
}) => {
  const appContext = useContext(AppContext);
  return (
    <button className="toggle-button" onClick={onClick}>
      {/* <div className="toggle-button-line" />
    <div className="toggle-button-line" />
    <div className="toggle-button-line" /> */}
      <div className="align-items-center">
        {appContext.user?.imageUrl.length !== 0 ? (
          <Avatar
            alt="CC"
            sx={{ width: 40, height: 40 }}
            src={"data:image/png;base64," + appContext.user?.imageUrl}
          />
        ) : (
          <Avatar sx={{ width: 40, height: 40 }}>
            {appContext.user.firstName[0] + appContext.user.lastName[0]}
          </Avatar>
        )}
      </div>
    </button>
  );
};
export default RightDrawerToggleButton;
