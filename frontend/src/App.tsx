import { useQuery } from "@apollo/client";
import { GET_CATEGORIES, GET_PRODUCTS } from "./graphql/queries";
import type { Category, Product } from "./types";

function App() {
  const { loading: catLoading, data: catData } = useQuery<{
    categories: Category[];
  }>(GET_CATEGORIES);
  const { loading: prodLoading, data: prodData } = useQuery<{
    products: Product[];
  }>(GET_PRODUCTS);

  if (catLoading || prodLoading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>GraphQL Connection Test</h1>

      <h2>Categories</h2>
      <ul>
        {catData?.categories.map((cat: Category) => (
          <li key={cat.name}>{cat.name}</li>
        ))}
      </ul>

      <h2>Products ({prodData?.products.length})</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {prodData?.products.map((product: Product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            <img
              src={product.gallery[0]}
              alt={product.name}
              style={{ width: "100%", height: "150px", objectFit: "contain" }}
            />
            <h3>{product.name}</h3>
            <p>{product.brand}</p>
            <p style={{ color: product.inStock ? "green" : "red" }}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </p>
            <p style={{ fontWeight: "bold" }}>
              {product.prices[0]?.currency.symbol}
              {product.prices[0]?.amount.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
