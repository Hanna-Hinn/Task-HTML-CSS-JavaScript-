//Container Component
/* 
  This Component that will display the List or the the Form in it's content
  depending on which mode it is in according to the Context
*/
import React, { useContext } from "react";
import classes from "./Container.module.css";

import ItemList from "./listComponents/ItemsList";
import Form from "./formComponents/Form";
import GlobalContext from "../../store/globalContext";

const Container = () => {
  const ctx = useContext(GlobalContext);
  return (
    <div className={classes.container}>
      {ctx.mode === "list" && <ItemList />}
      {(ctx.mode === "form") && <Form />}
    </div>
  );
};

export default Container;
