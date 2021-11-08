import { FC, useState } from "react";
import React, { Component } from "react";

import SideDrawer from "../components/SideDrawer/LeftSideDrawer";
import Backdrop from "../components/Backdrop/Backdrop";
import { User } from "../Models/User";
import Header from "../components/Toolbar/Header";

interface MainPageProps {
  visible: boolean;
  user: User;
  changePage: any;
}
export const MainPage: FC<MainPageProps> = ({ visible, changePage, user }) => {
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
    changePage("Login");
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
                  <button
                    onClick={() => {
                      changePage("Login");
                    }}
                  >
                    GO TO LOGIN
                  </button>
                  <button onClick={logOut}>LOGOUT</button>
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
        </>
      ) : (
        ""
      )}
      {/*{visible && (*/}
      {/*  <div>*/}
      {/*    <div style={{ height: "100%" }}>*/}
      {/*      <Header drawerClickHandler={leftDrawerToggleClickHandlder} />*/}
      {/*      {leftDrawerOpen && (*/}
      {/*        <>*/}
      {/*          <SideDrawer />*/}
      {/*          <Backdrop onClick={backdropClickHandler} />*/}
      {/*        </>*/}
      {/*      )}*/}

      {/*      <main style={{ marginTop: "63px" }}>*/}
      {/*        <p> This is the main content</p>*/}
      {/*      </main>*/}
      {/*    </div>*/}
      {/*    <div*/}
      {/*      style={{*/}
      {/*        display: "flex",*/}
      {/*        justifyContent: "center",*/}
      {/*        alignItems: "center",*/}
      {/*        height: "100vh",*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      <ul>*/}
      {/*        <li>*/}
      {/*          <button*/}
      {/*            onClick={() => {*/}
      {/*              changePage("Login");*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            GO TO LOGIN*/}
      {/*          </button>*/}
      {/*        </li>*/}
      {/*        <li>*/}
      {/*          <div*/}
      {/*            onClick={() => {*/}
      {/*              changePage("Register");*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            GO TO Register*/}
      {/*          </div>*/}
      {/*        </li>*/}
      {/*        <li>*/}
      {/*          <div>Main Page</div>*/}
      {/*        </li>*/}
      {/*      </ul>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*)}*/}
      {/*<div>{user.firstName}</div>*/}
    </>
  );
};
