import { NavLink } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../graphql/queries";
import { useCart } from "../context/CartContext";
import type { Category } from "../types";
import "./Header.scss";

function Header() {
  const { data } = useQuery<{ categories: Category[] }>(GET_CATEGORIES);
  const { totalItems, toggleCart } = useCart();

  return (
    <header className="header">
      <nav className="header__nav">
        {data?.categories.map((category: Category) => (
          <NavLink
            key={category.name}
            to={category.name === "all" ? "/" : `/${category.name}`}
            className={({ isActive }) =>
              `header__nav-link ${isActive ? "header__nav-link--active" : ""}`
            }
            data-testid={
              category.name === "all"
                ? "active-category-link"
                : `category-link-${category.name}`
            }
          >
            {category.name.toUpperCase()}
          </NavLink>
        ))}
      </nav>

      <div className="header__logo">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 2L2 9L16 16L30 9L16 2Z" fill="#5ECE7B" />
          <path d="M2 9V23L16 30V16L2 9Z" fill="#5ECE7B" opacity="0.7" />
          <path d="M30 9V23L16 30V16L30 9Z" fill="#5ECE7B" opacity="0.5" />
        </svg>
      </div>

      <button
        className="header__cart-btn"
        onClick={toggleCart}
        data-testid="cart-btn"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M4 4H5.62L8.06 12.53C8.12 12.76 8.33 12.92 8.57 12.92H15.5C15.73 12.92 15.94 12.77 16 12.56L17.85 6.48C17.93 6.21 17.72 5.95 17.45 5.95H6.5"
            stroke="#1D1F22"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="16" r="1" fill="#1D1F22" />
          <circle cx="15" cy="16" r="1" fill="#1D1F22" />
        </svg>
        {totalItems > 0 && (
          <span className="header__cart-count">{totalItems}</span>
        )}
      </button>
    </header>
  );
}

export default Header;
