import React, { FC } from "react";
import "./RightDrawerToggleButton.css";

interface rightDrawerToggleButtonProps {
  onClick: any;
}
const RightDrawerToggleButton: FC<rightDrawerToggleButtonProps> = ({
  onClick,
}) => (
  <button className="toggle-button" onClick={onClick}>
    {/* <div className="toggle-button-line" />
    <div className="toggle-button-line" />
    <div className="toggle-button-line" /> */}
    <div className="align-items-center">User</div>
  </button>
);

export default RightDrawerToggleButton;
