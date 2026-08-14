import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";

const CartContext = createContext(null);
const KEY = "freshbazaar_cart_v1";

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { product, qty } = action;
      const found = state.find((i) => i.id === product.id);
      if (found)
        return state.map((i) =>
          i.id === product.id ? { ...i, qty: Math.min(i.qty + qty, product.stock) } : i
        );
      return [...state, { ...product, qty: Math.min(qty, product.stock) }];
    }
    case "SET_QTY":
      return state
        .map((i) => (i.id === action.id ? { ...i, qty: action.qty } : i))
        .filter((i) => i.qty > 0);
    case "REMOVE":
      return state.filter((i) => i.id !== action.id);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, load);
  const [lastAdded, setLastAdded] = useState(0); // timestamp → triggers navbar badge bounce

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const api = useMemo(() => {
    const count = items.reduce((s, i) => s + i.qty, 0);
    const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
    const savings = items.reduce(
      (s, i) => s + (i.oldPrice ? (i.oldPrice - i.price) * i.qty : 0),
      0
    );
    const deliveryFee = subtotal === 0 ? 0 : subtotal >= 3000 ? 0 : 150;
    return {
      items,
      count,
      subtotal,
      savings,
      deliveryFee,
      total: subtotal + deliveryFee,
      lastAdded,
      addToCart: (product, qty = 1) => {
        dispatch({ type: "ADD", product, qty });
        setLastAdded(Date.now());
      },
      setQty: (id, qty) => dispatch({ type: "SET_QTY", id, qty }),
      remove: (id) => dispatch({ type: "REMOVE", id }),
      clear: () => dispatch({ type: "CLEAR" }),
    };
  }, [items, lastAdded]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
