//Header Component
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import classes from "./header.module.css";
import GlobalContext from "../../store/globalContext";

const Header = () => {
  const ctx = useContext(GlobalContext);
  const mode = ctx.mode;
  return (
    <div className={classes.top_header}>
      <h1 className={classes.header_text}>
        {mode === "list" && "Events"}
        {mode === "form" && "Create"}
        {mode === "save" && "Edit"}
      </h1>
      {mode !== "form" && (
        <NavLink className={classes.create_new} to="/new-form">
          +New
        </NavLink>
      )}
    </div>
  );
};

export default Header;
