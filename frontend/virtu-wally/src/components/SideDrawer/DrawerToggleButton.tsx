import React, { FC } from "react";
import "./DrawerToggleButton.css";

interface drawerToggleButtonProps {
  onClick: any;
}
const DrawerToggleButton: FC<drawerToggleButtonProps> = ({ onClick }) => (
  <button className="toggle-button" onClick={onClick}>
    <div className="toggle-button-line" />
    <div className="toggle-button-line" />
    <div className="toggle-button-line" />
  </button>
);

export default DrawerToggleButton;
