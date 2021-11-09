import { FC, useContext, useState } from "react";
import React, { Component } from "react";

import SideDrawer from "../components/SideDrawer/LeftSideDrawer";
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
  const leftDrawerToggleClickHandlder = () => {
    setLeftDrawerOpen(!leftDrawerOpen);
  };
  const backdropClickHandler = () => {
    setLeftDrawerOpen(false);
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
          <div>
            <div style={{ height: "100%" }}>
              <Header drawerClickHandler={leftDrawerToggleClickHandlder} />
              {leftDrawerOpen && (
                <>
                  <SideDrawer />
                  <Backdrop onClick={backdropClickHandler} />
                </>
              )}

              <main style={{ marginTop: "63px" }}>
                <p> This is the main content</p>
              </main>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
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
