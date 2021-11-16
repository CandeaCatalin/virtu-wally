import { FC, useContext } from "react";
import React from "react";
import { AppContext } from "../Context/AppContext";
import { Header } from "../components/Header/Header";
import { Modals } from "../components/Modals";

interface MainPageProps {
  visible: boolean;
}

export const MainPage: FC<MainPageProps> = ({ visible }) => {
  const appContext = useContext(AppContext);

  return (
    <>
      {visible ? (
        <>
          <Header />
          <div className="main-body">
            <div style={{ zIndex: 500, position: "absolute", width: "100vw" }}>
              <Modals />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <img
                height={100}
                src={"data:image/png;base64," + appContext.user.imageUrl}
              />
              <ul>
                <li>
                  <button onClick={() => {}}>GO TO LOGIN</button>
                </li>
                <li>
                  <div
                    onClick={() => {
                      appContext.changePage("Register");
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
