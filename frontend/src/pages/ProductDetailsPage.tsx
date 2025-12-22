import { useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "../graphql/queries";
import { useCart } from "../context/CartContext";
import type { Product, AttributeSet } from "../types";
import "./ProductDetailsPage.scss";

function ProductDetailsPage() {
  const { productId } = useParams<{ productId: string }>();
  const { addToCart, toggleCart, isOpen } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >({});

  const { loading, error, data } = useQuery<{ product: Product }>(GET_PRODUCT, {
    variables: { id: productId },
  });

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;
  if (!data?.product) return <div className="error">Product not found</div>;

  const product = data.product;

  const handleAttributeSelect = (attributeId: string, itemId: string) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attributeId]: itemId,
    }));
  };

  const allAttributesSelected = product.attributes.every(
    (attr) => selectedAttributes[attr.id]
  );

  const handleAddToCart = () => {
    if (!product.inStock) return;
    if (!allAttributesSelected && product.attributes.length > 0) return;

    addToCart(product, selectedAttributes);

    if (!isOpen) {
      toggleCart();
    }
  };

  const price = product.prices[0];

  return (
    <div
      className="pdp"
      data-testid={`product-${product.name.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="pdp__gallery">
        <div className="pdp__thumbnails" data-testid="product-gallery">
          {product.gallery.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.name} ${index + 1}`}
              className={`pdp__thumbnail ${
                selectedImage === index ? "pdp__thumbnail--active" : ""
              }`}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
        <div className="pdp__main-image">
          <img src={product.gallery[selectedImage]} alt={product.name} />
          {product.gallery.length > 1 && (
            <>
              <button
                className="pdp__nav pdp__nav--prev"
                onClick={() =>
                  setSelectedImage((prev) =>
                    prev === 0 ? product.gallery.length - 1 : prev - 1
                  )
                }
                aria-label="Previous image"
              >
                &#8249;
              </button>
              <button
                className="pdp__nav pdp__nav--next"
                onClick={() =>
                  setSelectedImage((prev) =>
                    prev === product.gallery.length - 1 ? 0 : prev + 1
                  )
                }
                aria-label="Next image"
              >
                &#8250;
              </button>
            </>
          )}
        </div>
      </div>

      <div className="pdp__info">
        <h1 className="pdp__brand">{product.brand}</h1>
        <h2 className="pdp__name">{product.name}</h2>

        {product.attributes.map((attribute: AttributeSet) => {
          const attributeKebab = attribute.name
            .toLowerCase()
            .replace(/\s+/g, "-");

          return (
            <div
              key={attribute.id}
              className="pdp__attribute"
              data-testid={`product-attribute-${attributeKebab}`}
            >
              <h3 className="pdp__attribute-name">{attribute.name}:</h3>
              <div className="pdp__attribute-items">
                {attribute.items.map((item) => {
                  const isSelected =
                    selectedAttributes[attribute.id] === item.id;
                  const attributeKebab = attribute.name
                    .toLowerCase()
                    .replace(/\s+/g, "-");
                  const itemTestId = `product-attribute-${attributeKebab}-${item.displayValue.replace(
                    /\s+/g,
                    "-"
                  )}`;
                  const commonProps = {
                    key: item.id,
                    onClick: () => handleAttributeSelect(attribute.id, item.id),
                    "data-testid": itemTestId,
                  };

                  if (attribute.type === "swatch") {
                    return (
                      <button
                        {...commonProps}
                        className={`pdp__swatch ${
                          isSelected ? "pdp__swatch--selected" : ""
                        }`}
                        style={{ backgroundColor: item.value }}
                        title={item.displayValue}
                      />
                    );
                  }

                  return (
                    <button
                      {...commonProps}
                      className={`pdp__text-option ${
                        isSelected ? "pdp__text-option--selected" : ""
                      }`}
                    >
                      {item.displayValue}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div className="pdp__price">
          <h3 className="pdp__price-label">PRICE:</h3>
          <p className="pdp__price-value">
            {price.currency.symbol}
            {price.amount.toFixed(2)}
          </p>
        </div>

        <button
          className={`pdp__add-to-cart ${
            !product.inStock ||
            (!allAttributesSelected && product.attributes.length > 0)
              ? "pdp__add-to-cart--disabled"
              : ""
          }`}
          onClick={handleAddToCart}
          disabled={
            !product.inStock ||
            (!allAttributesSelected && product.attributes.length > 0)
          }
          data-testid="add-to-cart"
        >
          {product.inStock ? "ADD TO CART" : "OUT OF STOCK"}
        </button>

        <div className="pdp__description" data-testid="product-description">
          {parse(product.description)}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
