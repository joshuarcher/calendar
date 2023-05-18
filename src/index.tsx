import React from "react";
import { createRoot } from "react-dom/client";
import AppContainer from "./components/App/AppContainer";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import calendarApp from "./redux/reducers";
import * as serviceWorker from "./serviceWorker";
import "./index.css";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

const store = createStore(
  calendarApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store as any}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <AppContainer />
    </LocalizationProvider>
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
