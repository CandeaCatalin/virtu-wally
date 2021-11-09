import React, { FC } from "react";

import LeftDrawerToggleButton from "../LeftSideDrawer/LeftDrawerToggleButton";
import RightDrawerToggleButton from "../RightSideDrawer/RightDrawerToggleButton";

import "./Header.css";
interface toolbarProps {
  leftDrawerClickHandler: any;
  rightDrawerClickHandler: any;
}
const Header: FC<toolbarProps> = ({
  leftDrawerClickHandler,
  rightDrawerClickHandler,
}) => (
  <header className="toolbar">
    <nav className="toolbar-navigation">
      <div>
        <LeftDrawerToggleButton onClick={leftDrawerClickHandler} />
      </div>
      <div className="toolbar-logo">
        <a href="/">The Logo </a>
      </div>
      <div className="spacer"> </div>
      <div className="toolbar-navigation-items">
        <ul>
          <li>
            <a href="/">User</a>
            <RightDrawerToggleButton onClick={rightDrawerClickHandler} />
          </li>
        </ul>
      </div>
    </nav>
  </header>
);

export default Header;
