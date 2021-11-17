import { FC, useContext } from "react";
import "./style.css";
import React from "react";
import { AppContext } from "../Context/AppContext";
import { Header } from "../components/Header/Header";

interface MainPageProps {
  visible: boolean;
}

export const MainPage: FC<MainPageProps> = ({ visible }) => {
  const context = useContext(AppContext);

  return (
    <>
      {visible ? (
        <>
          <div className="mainpage-body">
            <Header />
            {/* <div>Main Page</div> */}
            <div className="main-div">
              <div className="documents"></div>
              {/* aici punem categoriile fiecarui user */}
              <ul className="document-list">
                <li className="row col-10">
                  <a className="button-Documents" href="/">
                    Products
                  </a>
                  {/* <button className="category">Products </button> */}
                </li>
                <li className="row col-10">
                  <a className="button-Documents" href="/">
                    Users
                  </a>
                </li>
                <li className="row col-10">
                  <a className="button-Documents" href="/">
                    Products
                  </a>
                  {/* <button className="category">Products </button> */}
                </li>
                <li className="row col-10">
                  <a className="button-Documents" href="/">
                    Users
                  </a>
                </li>
                <li className="row col-10">
                  <a className="button-Documents" href="/">
                    Products
                  </a>
                  {/* <button className="category">Products </button> */}
                </li>
                <li className="row col-10">
                  <a className="button-Documents" href="/">
                    Users
                  </a>
                </li>
                <li className="row col-10">
                  <a className="button-Documents" href="/">
                    Users
                  </a>
                </li>
              </ul>
            </div>
            <div className="add-document-1">
              <div className="add-document">
                <div className="addition-logo">+</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};
