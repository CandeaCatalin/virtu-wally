import React from "react";

import "./LeftSideDrawer.css";

const LeftSideDrawer = () => (
  <nav className="side-drawer">
    <div className="categories">Categories</div>
    {/* aici punem categoriile fiecarui user */}
    <ul>
      <li className="row col-10">
        <a className="button-categories" href="/">
          Products
        </a>
        {/* <button className="category">Products </button> */}
      </li>
      <li className="row col-10">
        <a className="button-categories" href="/">
          Users
        </a>
      </li>
      <li className="row col-10">
        <a className="button-categories" href="/">
          Products
        </a>
        {/* <button className="category">Products </button> */}
      </li>
      <li className="row col-10">
        <a className="button-categories" href="/">
          Users
        </a>
      </li>
      <li className="row col-10">
        <a className="button-categories" href="/">
          Products
        </a>
        {/* <button className="category">Products </button> */}
      </li>
      <li className="row col-10">
        <a className="button-categories" href="/">
          Users
        </a>
      </li>
    </ul>

    <a className="button-help" href="/">
      Help
    </a>
  </nav>
);

export default LeftSideDrawer;
