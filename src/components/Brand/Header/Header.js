import React from "react";
import classes from "./Header.module.scss";
import { HeaderCartButton } from "@components";

export default function Header(props) {
  console.log("Header is rendering");
  return (
    <React.Fragment>
      <div className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton></HeaderCartButton>
      </div>
      <div className={classes["main-image"]}>
        <img src="/images/meals.jpg" alt="meals"></img>
      </div>
    </React.Fragment>
  );
}
