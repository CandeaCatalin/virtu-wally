import { FC, useState } from "react";
import React, { Component } from "react";

import Toolbar from "../components/Toolbar/Toolbar";
import SideDrawer from "../components/SideDrawer/SideDrawer";
import Backdrop from "../components/Backdrop/Backdrop";

interface MainPageProps {
  visible: boolean;
  changePage: any;
}

export const MainPage: FC<MainPageProps> = ({ visible, changePage }) => {
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const leftDrawerToggleClickHandlder = () => {
    setLeftDrawerOpen(!leftDrawerOpen);
  };
  const backdropClickHandler = () => {
    setLeftDrawerOpen(false);
  };
  return (
    <>
      {visible && (
        <div>
          <div style={{ height: "100%" }}>
            <Toolbar drawerClickHandler={leftDrawerToggleClickHandlder} />
            {leftDrawerOpen && (
              <>
                <SideDrawer />
                <Backdrop click={backdropClickHandler} />
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
                <button
                  onClick={() => {
                    changePage("Login");
                  }}
                >
                  GO TO LOGIN
                </button>
              </li>
              <li>
                <div
                  onClick={() => {
                    changePage("Register");
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
      )}
    </>
  );
};
