//Navigation Component
/* 
  -- This file is responsible for the navigation between the list and the form
  -- where it reads the mode from the context and by that it determines :
      1.) If the mode is "list" then it will add the class active to the list link
      2.) If the mode is "form" then it will add the class active to the form link 
*/
import React, { Fragment, useContext } from "react";
import { NavLink } from "react-router-dom";

import classes from "./nav.module.css";
import GlobalContext from "../../store/globalContext";

const Navigation = () => {
  const ctx = useContext(GlobalContext);

  //Active Style method that will add the class active to the link.
  function activeStyle(type) {
    if (type === "list") {
      return classes.list_nav + " " + classes.active;
    } else {
      return classes.form_nav + " " + classes.active;
    }
  }

  return (
    <Fragment>
      <NavLink
        className={ctx.mode === "list" ? activeStyle("list") : classes.list_nav}
        to="/list"
      >
        List
      </NavLink>

      <NavLink
        className={ctx.mode === "form" ? activeStyle("form") : classes.form_nav}
        to="/new-form"
      >
        Form
      </NavLink>
    </Fragment>
  );
};

export default Navigation;
