import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Product } from "../types";

interface CartItem {
  product: Product;
  quantity: number;
  selectedAttributes: Record<string, string>;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  addToCart: (
    product: Product,
    selectedAttributes: Record<string, string>
  ) => void;
  removeFromCart: (
    productId: string,
    selectedAttributes: Record<string, string>
  ) => void;
  updateQuantity: (
    productId: string,
    selectedAttributes: Record<string, string>,
    quantity: number
  ) => void;
  toggleCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = useCallback(
    (product: Product, selectedAttributes: Record<string, string>) => {
      setItems((prev) => {
        const existingIndex = prev.findIndex(
          (item) =>
            item.product.id === product.id &&
            JSON.stringify(item.selectedAttributes) ===
              JSON.stringify(selectedAttributes)
        );

        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + 1,
          };
          return updated;
        }

        return [...prev, { product, quantity: 1, selectedAttributes }];
      });
    },
    []
  );

  const removeFromCart = useCallback(
    (productId: string, selectedAttributes: Record<string, string>) => {
      setItems((prev) =>
        prev.filter(
          (item) =>
            !(
              item.product.id === productId &&
              JSON.stringify(item.selectedAttributes) ===
                JSON.stringify(selectedAttributes)
            )
        )
      );
    },
    []
  );

  const updateQuantity = useCallback(
    (
      productId: string,
      selectedAttributes: Record<string, string>,
      quantity: number
    ) => {
      if (quantity <= 0) {
        removeFromCart(productId, selectedAttributes);
        return;
      }

      setItems((prev) =>
        prev.map((item) =>
          item.product.id === productId &&
          JSON.stringify(item.selectedAttributes) ===
            JSON.stringify(selectedAttributes)
            ? { ...item, quantity }
            : item
        )
      );
    },
    [removeFromCart]
  );

  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.prices[0].amount * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleCart,
        closeCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
