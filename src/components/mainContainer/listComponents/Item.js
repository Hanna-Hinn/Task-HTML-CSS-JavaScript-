// Item Component
/* 
  This Is the item Component where it will take an obj as a prop
  and then return the item component as a link (Event Box that we see).
  *It will also assign the back-ground color of the events depending on
    1.) Past Event --> Red
    2.) Present (today) Event --> Blue
    3.) Future Event --> Purple
  *Clicking on the Item(event) will take us to a new page with the id of the clicked item as a parameter sent in the URL
*/
import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./item.module.css";

const Item = (props) => {
  let style = classes.item;

  if (setColor(props.obj.date) === 0) {
    style = style + " " + classes.present;
  } else if (setColor(props.obj.date) === -1) {
    style = style + " " + classes.future;
  }

  return (
    <NavLink className={style} to={"/new-form/" + props.obj.id}>
      <h5>{props.obj.name}</h5>
      <p>{props.obj.date}</p>
    </NavLink>
  );
};

function setColor(date) {
  let curr = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
  let format = new Date(new Date(date).setHours(0, 0, 0, 0)).getTime();
  if (curr === format) {
    return 0;
  } else if (curr < format) {
    return -1;
  } else {
    return 1;
  }
}

export default Item;
