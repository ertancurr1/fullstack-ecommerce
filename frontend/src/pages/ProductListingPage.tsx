import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../graphql/queries";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types";
import "./ProductListingPage.scss";

function ProductListingPage() {
  const { category } = useParams<{ category?: string }>();
  const categoryName = category || "all";

  const { loading, error, data } = useQuery<{ products: Product[] }>(
    GET_PRODUCTS,
    {
      variables: { category: categoryName },
    }
  );

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="product-listing">
      <h1 className="product-listing__title">{categoryName}</h1>
      <div className="product-listing__grid">
        {data?.products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductListingPage;
