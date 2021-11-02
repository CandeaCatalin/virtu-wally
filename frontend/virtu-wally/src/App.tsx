import React, { useState } from "react";
import "./App.css";
import { LoginPage, MainPage, RegisterPage } from "./Pages";

enum MenuItems {
  Main = "Main",
  Login = "Login",
  Register = "Register",
}

function App() {
  const [selectedPage, setSelectedPage] = useState("Main");
  const changePage = (newPage: string) => {
    setSelectedPage(newPage);
  };
  return (
    <div>
      {selectedPage === MenuItems.Main && (
        <MainPage
          visible={selectedPage === MenuItems.Main}
          changePage={changePage}
        />
      )}
      {selectedPage === MenuItems.Login && (
        <LoginPage
          visible={selectedPage === MenuItems.Login}
          changePage={changePage}
        />
      )}
      {selectedPage === MenuItems.Register && (
        <RegisterPage
          visible={selectedPage === MenuItems.Register}
          changePage={changePage}
        />
      )}
    </div>
  );
}

export default App;
