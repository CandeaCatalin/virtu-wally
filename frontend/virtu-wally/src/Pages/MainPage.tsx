import { FC, useContext, useState } from "react";
import React, { Component } from "react";

import LeftSideDrawer from "../components/LeftSideDrawer/LeftSideDrawer";
import RightSideDrawer from "../components/RightSideDrawer/RightSideDrawer";
import Backdrop from "../components/Backdrop/Backdrop";
import { User } from "../Models/User";
import Header from "../components/Toolbar/Header";
import { AppContext } from "../Context/AppContext";

interface MainPageProps {
  visible: boolean;
}

export const MainPage: FC<MainPageProps> = ({ visible }) => {
  const context = useContext(AppContext);
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const leftDrawerToggleClickHandlder = () => {
    setLeftDrawerOpen(!leftDrawerOpen);
  };
  const rightDrawerToggleClickHandlder = () => {
    setRightDrawerOpen(!rightDrawerOpen);
  };
  const leftBackdropClickHandler = () => {
    setLeftDrawerOpen(false);
  };
  const rightBackdropClickHandler = () => {
    setRightDrawerOpen(false);
  };
  const logOut = async () => {
    const response = await fetch("/api/Authentication/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    context.changePage("Login");
  };
  return (
    <>
      {visible ? (
        <>
          <div className="main-body">
            <div style={{ height: "100%" }}>
              <Header
                leftDrawerClickHandler={leftDrawerToggleClickHandlder}
                rightDrawerClickHandler={rightDrawerToggleClickHandlder}
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

              {/* <main style={{ marginTop: "30px" }}>
                <p> This is the main content</p>
              </main> */}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "90vh",
              }}
            >
              <ul>
                <li>
                  <button onClick={() => {}}>GO TO LOGIN</button>
                  <button onClick={logOut}>LOGOUT</button>
                </li>
                <li>
                  <div
                    onClick={() => {
                      context.changePage("Register");
                    }}
                  >
                    GO TO Register
                  </div>
                </li>
                <li>
                  <div>Main Page</div>
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};
