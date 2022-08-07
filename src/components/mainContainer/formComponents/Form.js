//Form component
import React, { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import classes from "./form.module.css";
import GlobalContext from "../../../store/globalContext";

const Form = () => {
  const [saveMode, setSaveMode] =
    useState(false); /* this will check if the form in in edit or create*/
  const [isValid, setIsValid] =
    useState(false); /* This will check if the form inputs are Valid or not */
  const [eventId, setEventId] =
    useState(
      ""
    ); /* This state will save the eventId that was sent thro the URL as a parameter */

  const [name, setName] =
    useState(""); /* This is the State that will control the name input field */
  const [description, setDescription] =
    useState(
      ""
    ); /* This is the State that will control the name description field */
  const [date, setDate] =
    useState(); /* This is the State that will control the name date field */

  const ctx = useContext(GlobalContext); /* retrieving the Context */
  let { id } = useParams(); // Searching and extracting the id parameter from the url

  useEffect(() => {
    if (id) {
      setEventId(id);
      setSaveMode(true);
      setIsValid(true);
    }
  }, [id]);

  let event;

  if (saveMode) {
    event = ctx.events.find((obj) => {
      return obj.id === eventId;
    });
  }

  useEffect(() => {
    if (event) {
      setName(event.name);
      setDescription(event.description);
      setDate(event.date);
    }
  }, [event]);

  //method to redirect the user to the list page when submitting
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/list";
    navigate(path);
  };

  //Form SubmissionHandler
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    const obj = {
      name: name,
      description: description,
      date: date + "",
    };
    addEventHandler(obj);
  };

  //Adding or Updating the Data in the Firebase using FetchAPI
  function addEventHandler(obj) {
    let dBUrl =
      "https://event-task-f2694-default-rtdb.firebaseio.com/events.json";
    let requestObj = {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (saveMode) {
      dBUrl =
        "https://event-task-f2694-default-rtdb.firebaseio.com/events/" +
        eventId +
        ".json";

      requestObj = {
        method: "PUT",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }
    fetch(dBUrl, requestObj).then(() => {
      routeChange();
    });
  }

  // Input onChange Handlers :
  const nameChangeHandler = (event) => {
    setName(event.target.value);
    checkValid();
  };

  const dateChangeHandler = (event) => {
    setDate(event.target.value);
    checkValid();
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  //Method that will check if the name and date input fields are valid or not.
  function checkValid() {
    if (name && date) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }

  return (
    <form className={classes.cont_form} onSubmit={formSubmissionHandler}>
      <label className={classes.col}>
        Name:
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Event Name..."
          value={name}
          required
          onChange={nameChangeHandler}
        />
      </label>

      <label className={classes.col}>
        Description:
        <textarea
          id="text-area"
          name="text-area"
          placeholder="Details about the event..."
          value={description}
          onChange={descriptionChangeHandler}
        ></textarea>
      </label>

      <label className={classes.col}>
        Date:
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          required
          onChange={dateChangeHandler}
        />
      </label>
      <div className={classes.col}>
        <NavLink className={classes.cancel} to="/">
          Cancel
        </NavLink>
        <input type="submit" value="Add" id="add-save" disabled={!isValid} />
      </div>
    </form>
  );
};

export default Form;
