import { FC } from "react";

import Toolbar from "../components/Toolbar/Toolbar";
import SideDrawer from "../components/SideDrawer/SideDrawer";
import Backdrop from "../components/Backdrop/Backdrop";

interface MainPageProps {
  visible: boolean;
  changePage: any;
}

export const MainPage: FC<MainPageProps> = ({ visible, changePage }) => {
  return (
    <>
      {visible && (
        <div>
          <div style={{ height: "100%" }}>
            <Toolbar />
            <SideDrawer />
            <Backdrop />
            <main style={{ marginTop: "63px" }}>
              <p> This is the main content</p>
            </main>
          </div>
          <br /> <br />
          <button
            onClick={() => {
              changePage("Login");
            }}
          >
            GO TO LOGIN
          </button>
          <div
            onClick={() => {
              changePage("Register");
            }}
          >
            GO TO Register
          </div>
          Main Page
        </div>
      )}
    </>
  );
};
