export interface Currency {
  label: string;
  symbol: string;
}

export interface Price {
  amount: number;
  currency: Currency;
}

export interface AttributeItem {
  id: string;
  displayValue: string;
  value: string;
}

export interface AttributeSet {
  id: string;
  name: string;
  type: "text" | "swatch";
  items: AttributeItem[];
}

export interface Product {
  id: string;
  name: string;
  inStock: boolean;
  gallery: string[];
  description: string;
  category: string;
  attributes: AttributeSet[];
  prices: Price[];
  brand: string;
}

export interface Category {
  name: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedAttributes: Record<string, string>;
}
