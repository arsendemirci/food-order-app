import React, { useContext } from "react";
import classes from "./MealItem.module.scss";
import { MealItemForm } from "@components";
import { CartContext } from "@context";

export default function MealItem({ id, name, description, price }) {
  const ctx = useContext(CartContext);
  const addToCartHandler = (amount) => {
    ctx.onAddItem({ name, id, amount, price });
  };
  return (
    <li key={id} className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{price} $</div>
      </div>
      <MealItemForm onAddToCart={addToCartHandler}></MealItemForm>
    </li>
  );
}
