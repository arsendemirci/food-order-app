import React, { useReducer } from "react";

const CartContext = React.createContext({
  itemCount: 0,
  isOpen: false,
  totalAmount: 0,
  onAddItem: (item) => {},
  onRemoveItem: (id) => {},
  onClose: () => {},
  onOpen: () => {},
  items: [],
});

const defaultCartState = {
  items: [],
  itemCount: 0,
  isOpen: false,
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedItemCount = state.itemCount + action.item.amount;
    const updatedTotalAmount = state.totalAmount + action.item.amount * action.item.price;
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    console.log("totalAmount", state.totalAmount, updatedTotalAmount);
    return {
      items: updatedItems,
      itemCount: updatedItemCount,
      totalAmount: updatedTotalAmount,
      isOpen: state.isOpen,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.amount;
    const updatedItemCount = state.itemCount - 1;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      itemCount: updatedItemCount,
      totalAmount: updatedTotalAmount,
      isOpen: state.isOpen,
    };
  }
  if (action.type === "OPEN") {
    return {
      items: state.items,
      itemCount: state.itemCount,
      totalAmount: state.totalAmount,
      isOpen: true,
    };
  }
  if (action.type === "CLOSE") {
    return {
      items: state.items,
      itemCount: state.itemCount,
      totalAmount: state.totalAmount,
      isOpen: false,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    console.log("Cart Add Item from Meals", item);
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };
  const openCartHandler = () => {
    dispatchCartAction({ type: "OPEN" });
  };
  const closeCartHandler = () => {
    dispatchCartAction({ type: "CLOSE" });
  };

  const cartContext = {
    items: cartState.items,
    itemCount: cartState.itemCount,
    isOpen: cartState.isOpen,
    onAddItem: addItemToCartHandler,
    onRemoveItem: removeItemFromCartHandler,
    totalAmount: cartState.totalAmount,
    onOpen: openCartHandler,
    onClose: closeCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
  );
};

export { CartProvider, CartContext };
