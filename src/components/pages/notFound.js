//Not Found page where if the user enters a wrong url request it will return 404 error.
import React, { Fragment } from "react";

import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <Fragment>
      <h1 style={{ color: "rgb(249, 237, 0)", gridArea: "header" }}>
        404 Requested Page Does not Exist !!!
      </h1>
      <br />
      <NavLink to="/" style={{ color: "white", gridArea: "body" }}>
        Click Me to Go back To the Main Page !
      </NavLink>
    </Fragment>
  );
};

export default NotFound;
