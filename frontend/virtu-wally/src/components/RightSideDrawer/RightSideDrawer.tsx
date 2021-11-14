import React from "react";

import "./RightSideDrawer.css";

const RightSideDrawer = () => (
  <nav className="right-side-drawer">
    <div className="details">
      <p className="details-name"> FirstName LastName</p>
      <p className="details-email"> youremail@domain.com</p>
    </div>
    <ul>
      <li>
        <a className="right-list" href="/">
          Settings
        </a>
      </li>
      <li>
        <a className="right-list" href="/">
          Contact Us
        </a>
      </li>
    </ul>

    <a className="button-signout" href="/">
      Sign Out
    </a>
  </nav>
);

export default RightSideDrawer;
