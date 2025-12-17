import { useMutation } from "@apollo/client";
import { useCart } from "../context/CartContext";
import { CREATE_ORDER } from "../graphql/mutations";
import type { AttributeSet } from "../types";
import "./CartOverlay.scss";

function CartOverlay() {
  const { items, isOpen, closeCart, updateQuantity, totalItems, totalPrice } =
    useCart();
  const [createOrder, { loading }] = useMutation(CREATE_ORDER);

  if (!isOpen) return null;

  const handlePlaceOrder = async () => {
    if (items.length === 0) return;

    const productIds = items.flatMap((item) =>
      Array(item.quantity).fill(item.product.id)
    );

    try {
      await createOrder({ variables: { products: productIds } });
      alert("Order placed successfully!");
      closeCart();
    } catch {
      alert("Failed to place order. Please try again.");
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeCart();
    }
  };

  return (
    <div
      className="cart-overlay"
      onClick={handleOverlayClick}
      data-testid="cart-overlay"
    >
      <div className="cart-overlay__content">
        <h2 className="cart-overlay__title">
          <span className="cart-overlay__title-bold">My Bag,</span> {totalItems}{" "}
          item{totalItems !== 1 ? "s" : ""}
        </h2>

        <div className="cart-overlay__items">
          {items.map((item, index) => (
            <div key={`${item.product.id}-${index}`} className="cart-item">
              <div className="cart-item__details">
                <h3 className="cart-item__brand">{item.product.brand}</h3>
                <h4 className="cart-item__name">{item.product.name}</h4>
                <p className="cart-item__price">
                  {item.product.prices[0].currency.symbol}
                  {item.product.prices[0].amount.toFixed(2)}
                </p>

                {item.product.attributes.map((attr: AttributeSet) => (
                  <div key={attr.id} className="cart-item__attribute">
                    <span className="cart-item__attribute-name">
                      {attr.name}:
                    </span>
                    <div className="cart-item__attribute-values">
                      {attr.items.map((attrItem) => {
                        const isSelected =
                          item.selectedAttributes[attr.id] === attrItem.id;

                        if (attr.type === "swatch") {
                          return (
                            <span
                              key={attrItem.id}
                              className={`cart-item__swatch ${
                                isSelected ? "cart-item__swatch--selected" : ""
                              }`}
                              style={{ backgroundColor: attrItem.value }}
                            />
                          );
                        }

                        return (
                          <span
                            key={attrItem.id}
                            className={`cart-item__text-option ${
                              isSelected
                                ? "cart-item__text-option--selected"
                                : ""
                            }`}
                          >
                            {attrItem.displayValue}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-item__quantity">
                <button
                  className="cart-item__qty-btn"
                  onClick={() =>
                    updateQuantity(
                      item.product.id,
                      item.selectedAttributes,
                      item.quantity + 1
                    )
                  }
                  data-testid="cart-item-amount-increase"
                >
                  +
                </button>
                <span
                  className="cart-item__qty-value"
                  data-testid="cart-item-amount"
                >
                  {item.quantity}
                </span>
                <button
                  className="cart-item__qty-btn"
                  onClick={() =>
                    updateQuantity(
                      item.product.id,
                      item.selectedAttributes,
                      item.quantity - 1
                    )
                  }
                  data-testid="cart-item-amount-decrease"
                >
                  -
                </button>
              </div>

              <div className="cart-item__image">
                <img src={item.product.gallery[0]} alt={item.product.name} />
              </div>
            </div>
          ))}
        </div>

        <div className="cart-overlay__total">
          <span>Total</span>
          <span className="cart-overlay__total-value" data-testid="cart-total">
            ${totalPrice.toFixed(2)}
          </span>
        </div>

        <button
          className="cart-overlay__place-order"
          onClick={handlePlaceOrder}
          disabled={items.length === 0 || loading}
        >
          {loading ? "PLACING ORDER..." : "PLACE ORDER"}
        </button>
      </div>
    </div>
  );
}

export default CartOverlay;
