import React, { FC } from "react";

import "./Backdrop.css";
interface backdropProps {
  onClick: any;
}
const Backdrop: FC<backdropProps> = ({ onClick }) => {
  return <div className="backdrop" onClick={onClick} />;
};

export default Backdrop;
