//Layout Component

/* 
  It's the Main Structure of how the pages
  It will also control the mode in the Context based
  on the passed props which is the mode.
*/
import React, { Fragment, useContext } from "react";

import Header from "../headerComponents/header";
import Navigation from "../navComponents/Navigation";
import Container from "../mainContainer/Container";
import GlobalContext from "../../store/globalContext";

const Layout = (props) => {
  const ctx = useContext(GlobalContext);

  if (props.mode === "form") {
    ctx.toggleMode("form");
  } else if (props.mode === "save") {
    ctx.toggleMode("save");
  } else {
    ctx.toggleMode("list");
  }

  return (
    <Fragment>
      <Header />
      <Navigation />
      <Container />
    </Fragment>
  );
};

export default Layout;
