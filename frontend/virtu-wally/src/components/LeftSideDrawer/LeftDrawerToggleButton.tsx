import React, { FC } from "react";
import "./LeftDrawerToggleButton.css";

interface leftDrawerToggleButtonProps {
  onClick: any;
}
const LeftDrawerToggleButton: FC<leftDrawerToggleButtonProps> = ({
  onClick,
}) => (
  <button className="toggle-button" onClick={onClick}>
    <div className="toggle-button-line" />
    <div className="toggle-button-line" />
    <div className="toggle-button-line" />
  </button>
);

export default LeftDrawerToggleButton;
