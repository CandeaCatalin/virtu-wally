import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import { Main } from "./Main";
import { AppProvider } from "./Context/AppContext";

function App() {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
}

export default App;
