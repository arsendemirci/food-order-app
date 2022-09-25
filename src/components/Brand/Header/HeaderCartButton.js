import React, { useContext, useEffect, useRef } from "react";
import classes from "./HeaderCartButton.module.scss";
import { CartIcon } from "@icons";
import { CartContext } from "@context";

const HeaderCartButton = () => {
  const ctx = useContext(CartContext);
  const buttonRef = useRef();
  const { itemCount } = ctx;
  useEffect(() => {
    let interval;
    buttonRef.current.classList.remove(classes.bump);
    if (itemCount !== 0) {
      interval = setTimeout(() => {
        buttonRef.current.classList.add(classes.bump);
      }, 10);
    }

    return () => {
      if (interval) clearTimeout(interval);
      // buttonRef.current.classList.remove(classes.bump);
    };
  }, [itemCount]);
  return (
    <div ref={buttonRef} className={classes.bump}>
      <button type="button" className={classes.button} onClick={ctx.onOpen}>
        <CartIcon className={classes.icon}></CartIcon>
        <div>Your Cart </div>
        <span className={classes.badge}>{itemCount}</span>
      </button>
    </div>
  );
};
export default HeaderCartButton;
