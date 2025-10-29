"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { CartItem, Prompt } from "@/lib/types";

interface CartContextType {
  items: CartItem[];
  addToCart: (prompt: Prompt) => void;
  removeFromCart: (promptId: string) => void;
  clearCart: () => void;
  isInCart: (promptId: string) => boolean;
  totalPrice: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (prompt: Prompt) => {
    setItems((prev) => {
      // Check if item already exists
      if (prev.some((item) => item.prompt_id === prompt.id)) {
        return prev;
      }
      return [
        ...prev,
        {
          id: Date.now(), // Mock ID generation
          created_at: new Date().toISOString(),
          user_id: "1", // Mock user ID
          prompt_id: prompt.id,
          prompt,
        },
      ];
    });
  };

  const removeFromCart = (promptId: string) => {
    setItems((prev) => prev.filter((item) => item.prompt_id !== promptId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (promptId: string) => {
    return items.some((item) => item.prompt_id === promptId);
  };

  const totalPrice = items.reduce(
    (sum, item) => sum + (item.prompt?.price || 0),
    0
  );
  const itemCount = items.length;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        totalPrice,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
