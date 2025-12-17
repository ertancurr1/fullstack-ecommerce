import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { Product } from "../types";
import "./ProductCard.scss";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock) return;

    const defaultAttributes: Record<string, string> = {};
    product.attributes.forEach((attr) => {
      if (attr.items.length > 0) {
        defaultAttributes[attr.id] = attr.items[0].id;
      }
    });

    addToCart(product, defaultAttributes);
  };

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  const price = product.prices[0];

  return (
    <div
      className={`product-card ${
        !product.inStock ? "product-card--out-of-stock" : ""
      }`}
      onClick={handleClick}
      data-testid={`product-${product.id}`}
    >
      <div className="product-card__image-wrapper">
        <img
          src={product.gallery[0]}
          alt={product.name}
          className="product-card__image"
        />
        {!product.inStock && (
          <div className="product-card__out-of-stock-overlay">OUT OF STOCK</div>
        )}
        {product.inStock && (
          <button
            className="product-card__quick-add"
            onClick={handleQuickAdd}
            aria-label="Add to cart"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 4H5.62L8.06 12.53C8.12 12.76 8.33 12.92 8.57 12.92H15.5C15.73 12.92 15.94 12.77 16 12.56L17.85 6.48C17.93 6.21 17.72 5.95 17.45 5.95H6.5"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="16" r="1" fill="#fff" />
              <circle cx="15" cy="16" r="1" fill="#fff" />
            </svg>
          </button>
        )}
      </div>
      <h3 className="product-card__name">
        {product.brand} {product.name}
      </h3>
      <p className="product-card__price">
        {price.currency.symbol}
        {price.amount.toFixed(2)}
      </p>
    </div>
  );
}

export default ProductCard;
