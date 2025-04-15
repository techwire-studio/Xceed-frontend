import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, lazy, Suspense, useEffect } from "react";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

// Lazily load non-critical components
const CatalogSidebar = lazy(() => import("./components/CatalogSidebar"));
const Footer = lazy(() => import("./components/Footer"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const CartPage = lazy(() => import("./pages/CartPage"));

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categoriesHierarchy, setCategoriesHierarchy] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState(null);

  // Fetch categories once when the app loads
  useEffect(() => {
    const fetchCategories = async () => {
      setCategoriesLoading(true);
      setCategoriesError(null);
      try {
        const response = await axios.get(`${API_URL}/categories`);
        setCategoriesHierarchy(response.data.data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategoriesError("Failed to load categories. Please try again.");
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const toggleSidebar = () => {
    console.log("Toggle sidebar called, current state:", sidebarOpen);
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen">
          <Navbar toggleSidebar={toggleSidebar} />
          
          {sidebarOpen && (
            <CatalogSidebar 
              isOpen={sidebarOpen} 
              onClose={() => setSidebarOpen(false)}
              categoriesHierarchy={categoriesHierarchy}
              loading={categoriesLoading}
              error={categoriesError}
              refetchCategories={async () => {
                setCategoriesLoading(true);
                try {
                  const response = await axios.get(`${API_URL}/categories`);
                  setCategoriesHierarchy(response.data.data || []);
                  setCategoriesError(null);
                } catch (err) {
                  setCategoriesError("Failed to load categories. Please try again.");
                } finally {
                  setCategoriesLoading(false);
                }
              }}
            />
          )}
            
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:id" element={<ProductsPage toggleSidebar={toggleSidebar} />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;