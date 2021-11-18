import React, { FC } from "react";

import LeftDrawerToggleButton from "../LeftSideDrawer/LeftDrawerToggleButton";
import RightDrawerToggleButton from "../RightSideDrawer/RightDrawerToggleButton";

import "./Toolbar.css";

interface ToolbarProps {
  leftDrawerClickHandler: any;
  rightDrawerClickHandler: any;
}

const Toolbar: FC<ToolbarProps> = ({
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
      <div className="spacer"></div>
      <div className="toolbar-navigation-items">
        <ul>
          <li>
            <RightDrawerToggleButton onClick={rightDrawerClickHandler} />
          </li>
        </ul>
      </div>
    </nav>
  </header>
);

export default Toolbar;
