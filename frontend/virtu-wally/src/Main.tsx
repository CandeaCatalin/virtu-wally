import { LoginPage, MainPage, RegisterPage } from "./Pages";
import React, { useContext } from "react";
import { AppContext } from "./Context/AppContext";
import { MenuItems } from "./Models/MenuItems";

export const Main = () => {
  const appContext = useContext(AppContext);
  return (
    <div>
      {appContext.isLoading ? (
        <div>Loading</div>
      ) : (
        <>
          {appContext.selectedPage === MenuItems.Main && (
            <MainPage visible={appContext.selectedPage === MenuItems.Main} />
          )}
          {appContext.selectedPage === MenuItems.Login && (
            <LoginPage visible={appContext.selectedPage === MenuItems.Login} />
          )}
          {appContext.selectedPage === MenuItems.Register && (
            <RegisterPage
              visible={appContext.selectedPage === MenuItems.Register}
            />
          )}
        </>
      )}
    </div>
  );
};
