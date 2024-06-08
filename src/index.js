import React from "react";
// import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import store from "./store";
import store from "./redux/store";
// import { PersistGate } from "redux-persist/integration/react";
// import { store, persistor } from './redux/store';
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import './index.css';
// const theme = createTheme();
const root = createRoot(document.getElementById("root"));
root.render(
  <HelmetProvider>
    {/* <PersistGate persistor={persistor}> */}
    {/* <ThemeProvider theme={theme}> */}
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    {/* </PersistGate> */}
    {/* </ThemeProvider> */}
  </HelmetProvider>
);
