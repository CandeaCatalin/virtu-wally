import React from "react";
import "./App.css";
import { Main } from "./Main";
import { AppProvider } from "./Context/AppContext";
import { APIProvider } from "./Context/APIContext";

function App() {
  return (
    <AppProvider>
      <APIProvider>
        <Main />
      </APIProvider>
    </AppProvider>
  );
}

export default App;
