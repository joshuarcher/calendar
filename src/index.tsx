import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import AppContainer from "./components/App/AppContainer";
import { Provider } from "react-redux";
import { createStore } from "redux";
import calendarApp from "./redux/reducers";
import * as serviceWorker from "./serviceWorker";
import "./index.css";
import { createContext, useContext } from "react";
import { format } from "date-fns";
import { EventItem } from "./redux/actions";

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
  const [events, setEvents] = useState([]);

  const addEvent = (event: EventItem) => {
    if (event.title.length > 30) {
      throw new Error("Implement Correct login here");
    }

    // check if key of date exists yyyyMMdd  format
    const key = format(event.date, "yyyyMMdd");
    // if true add to array
    let newEvents = { ...events };
    if (events[key]) {
      newEvents[key].push(event);
    } else {
      newEvents[key] = [event];
    }
    setEvents(newEvents);
  };

  // Best practice would be to make this into its own function rather than placing useEffects throughout without labels.
  useEffect(() => {
    // fetch current events from database on first load
    fetch("http://localhost:8000/reminders", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      });
  });

  return (
    <DataContext.Provider
      value={{
        addEvent: addEvent,
        events,
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
