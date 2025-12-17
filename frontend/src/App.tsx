import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CartOverlay from "./components/CartOverlay";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import { CartProvider } from "./context/CartContext";
import "./App.scss";

function App() {
  return (
    <CartProvider>
      <div className="app">
        <Header />
        <CartOverlay />
        <main className="main">
          <Routes>
            <Route path="/" element={<ProductListingPage />} />
            <Route path="/:category" element={<ProductListingPage />} />
            <Route
              path="/product/:productId"
              element={<ProductDetailsPage />}
            />
          </Routes>
        </main>
      </div>
    </CartProvider>
  );
}

export default App;
