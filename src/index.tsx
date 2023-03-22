import React from "react";
import ReactDOM from "react-dom";
import AppContainer from "./components/App/AppContainer";
import { Provider } from "react-redux";
import { createStore } from "redux";
import calendarApp from "./redux/reducers";
import * as serviceWorker from "./serviceWorker";
import "./index.css";
import { createContext, useContext } from "react";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

const store = createStore(
  calendarApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const DataContext = createContext(null);

export const useAppContext = () => useContext(DataContext);

const AppContext = ({ children }) => {
  return (
    <DataContext.Provider
      value={{
        events: {
          "20230322": [{ title: "EXAMPLE", date: new Date(), color: "blue" }],
          "20230324": [{ title: "Friday", date: "", color: "green" }],
        },
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

ReactDOM.render(
  <Provider store={store as any}>
    <AppContext>
      <AppContainer />
    </AppContext>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
