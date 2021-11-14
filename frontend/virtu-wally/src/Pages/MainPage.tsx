import { FC, useContext } from "react";
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
          <Header />
          <div className="main-body">
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
