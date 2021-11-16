import {
  ForgetPasswordPage,
  LoadingPage,
  LoginPage,
  MainPage,
  RegisterPage,
} from "./Pages";
import React, { useContext, useState } from "react";
import { AppContext } from "./Context/AppContext";
import { MenuItems } from "./Models/MenuItems";
import { Modals } from "./components/Modals";

export const Main = () => {
  const context = useContext(AppContext);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletedCategoryId, setDeletedCategoryId] = useState(0);
  return (
    <div>
      {context.isLoading ? (
        <LoadingPage />
      ) : (
        <>
          {context.selectedPage === MenuItems.Main && (
            <MainPage visible={context.selectedPage === MenuItems.Main} />
          )}
          {context.selectedPage === MenuItems.Login && (
            <LoginPage visible={context.selectedPage === MenuItems.Login} />
          )}
          {context.selectedPage === MenuItems.Register && (
            <RegisterPage
              visible={context.selectedPage === MenuItems.Register}
            />
          )}
          {context.selectedPage === MenuItems.ForgetPassword && (
            <ForgetPasswordPage
              visible={context.selectedPage === MenuItems.ForgetPassword}
            />
          )}
        </>
      )}
    </div>
  );
};
