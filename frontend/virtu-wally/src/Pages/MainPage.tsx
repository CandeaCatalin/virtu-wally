import { FC } from "react";

interface MainPageProps {
  visible: boolean;
  changePage: any;
}

export const MainPage: FC<MainPageProps> = ({ visible, changePage }) => {
  return (
    <>
      {visible && (
        <div>
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
