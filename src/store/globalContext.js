//GlobalContext
// This file will contain the mode , data , toggleMode function for changing the mode
import React, { useState, useEffect } from "react";

//initializing the Context
const GlobalContext = React.createContext({
  mode: "list",
  events: [],
  toggleMode: () => {},
});

/* globalContextProvider :
    -- It will assign the values for the content of the context using states
    -- It will fetch the data (Events) from the database and Save it in the context
    -- It will return the GlobalContext.Provider Component with the values.
*/
export const GlobalContextProvider = (props) => {
  const [mode, setMode] = useState("list");
  const [events, setEvents] = useState([]);

  const toggleModeHandler = (mode) => {
    setMode(mode);
  };

  useEffect(() => {
    const arr = [];
    fetch("https://event-task-f2694-default-rtdb.firebaseio.com/events.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        Object.keys(data).forEach((key) => {
          const obj = {
            id: key,
            name: data[key].name,
            description: data[key].description,
            date: data[key].date,
          };
          arr.push(obj);
        });
        setEvents(arr);
      });
  }, [setEvents]);

  return (
    <GlobalContext.Provider
      value={{
        mode: mode,
        events: events,
        toggleMode: toggleModeHandler,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
