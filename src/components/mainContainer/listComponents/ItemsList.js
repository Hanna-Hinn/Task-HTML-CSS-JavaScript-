// Item listing Component

/*
   -- This component will read the data that is saved in the context
   -- Make the item Components according to the data in the Context.
*/

import React, { Fragment, useContext } from "react";

import Item from "./Item";
import GlobalContext from "../../../store/globalContext";

const ItemsList = (props) => {
  const ctx = useContext(GlobalContext);

  return (
    <Fragment>
      {ctx.events.map((item) => (
        <Item key={item.id} obj={item} />
      ))}
    </Fragment>
  );
};

export default ItemsList;
