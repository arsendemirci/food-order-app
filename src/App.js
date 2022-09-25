import React from "react";
import { Header, MealsSummary, MealsList, Cart } from "@components";
import { CartProvider } from "@context";

function App() {
  return (
    <CartProvider>
      <Cart></Cart>
      <Header></Header>
      <MealsSummary></MealsSummary>
      <MealsList></MealsList>
    </CartProvider>
  );
}

export default App;
