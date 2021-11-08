import React, { FC } from "react";

import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import "./Toolbar.css";
interface toolbarProps {
  drawerClickHandler: any;
}
const toolbar: FC<toolbarProps> = ({ drawerClickHandler }) => (
  <header className="toolbar">
    <nav className="toolbar-navigation">
      <div>
        <DrawerToggleButton onClick={drawerClickHandler} />
      </div>
      <div className="toolbar-logo">
        <a href="/">The Logo </a>
      </div>
      <div className="spacer"> </div>
      <div className="toolbar-navigation-items">
        <ul>
          <li>
            <a href="/">Products</a>
          </li>
          <li>
            <a href="/">Users</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);

export default toolbar;
