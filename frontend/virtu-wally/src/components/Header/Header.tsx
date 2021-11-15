import React, { FC, useState } from "react";
import Toolbar from "./Toolbar";
import LeftSideDrawer from "../LeftSideDrawer/LeftSideDrawer";
import Backdrop from "../Backdrop/Backdrop";
import RightSideDrawer from "../RightSideDrawer/RightSideDrawer";

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const leftDrawerToggleClickHandler = () => {
    setLeftDrawerOpen(!leftDrawerOpen);
  };
  const rightDrawerToggleClickHandler = () => {
    setRightDrawerOpen(!rightDrawerOpen);
  };
  const leftBackdropClickHandler = () => {
    setLeftDrawerOpen(false);
  };
  const rightBackdropClickHandler = () => {
    setRightDrawerOpen(false);
  };
  return (
    <>
      <div style={{ height: "100%" }}>
        <Toolbar
          leftDrawerClickHandler={leftDrawerToggleClickHandler}
          rightDrawerClickHandler={rightDrawerToggleClickHandler}
        />
        {(leftDrawerOpen && (
          <>
            <LeftSideDrawer />
            <Backdrop onClick={leftBackdropClickHandler} />
          </>
        )) ||
          (rightDrawerOpen && (
            <>
              <RightSideDrawer />
              <Backdrop onClick={rightBackdropClickHandler} />
            </>
          ))}
      </div>
    </>
  );
};
