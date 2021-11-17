import React, { useContext } from "react";

import "./RightSideDrawer.css";
import { AppContext } from "../../Context/AppContext";
import { APIContext } from "../../Context/APIContext";

const RightSideDrawer = () => {
  const appContext = useContext(AppContext);
  const apiContext = useContext(APIContext);
  return (
    <nav className="right-side-drawer">
      <div className="user-image-1 ">
        <div className="user-image center">
          <div className="initial-name">SC</div>
        </div>
      </div>
      <div className="details">
        <p className="details-name">
          {appContext.user.firstName + " " + appContext.user.lastName}
        </p>
        <p className="details-email"> {appContext.user.email}</p>
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

      <div className="button-signOut" onClick={apiContext.signOut}>
        Sign Out
      </div>
    </nav>
  );
};

export default RightSideDrawer;
