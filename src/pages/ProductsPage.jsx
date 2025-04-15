import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ChevronRight, Loader, ArrowLeft, Home } from "lucide-react";
import axios from "axios";
import ProductTable from "../components/ProductTable";
import Navbar from "../components/Navbar";

const API_URL = "http://localhost:5000/api/products";

const ProductsPage = () => {
  const { id } = useParams();
  console.log("ID from URL:", id);
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    totalProducts: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 20
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainCategory, setMainCategory] = useState("");

  // Get breadcrumb data from location state
  const breadcrumb = location.state?.breadcrumb || {
    mainCategory: "",
    category: "",
    subCategory: "",
  };

  useEffect(() => {
    if (id) {
      fetchProducts(id, pagination.currentPage, pagination.limit);
    }
  }, [id]);

  const fetchProducts = async (id, page = 1, limit = 20) => {
    try {
      setLoading(true);
      setError(null);

      const url = `${API_URL}/get-product/${id}?page=${page}&limit=${limit}`;
      const res = await axios.get(url);
      if (res.data && res.data.products) {
        setProducts(res.data.products);
        setMainCategory(res.data.products[0]?.category?.mainCategory || "");
        setPagination({
          totalProducts: res.data.totalProducts || 0,
          totalPages: res.data.totalPages || 0,
          currentPage: res.data.currentPage || page,
          limit: limit
        });
      } else {
        setError("No products found or invalid data format");
        setProducts([]);
      }
    } catch (err) {
      setError("Failed to load products");
      console.error("Error fetching products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchProducts(id, newPage, pagination.limit);
    }
  };

  const handleLimitChange = (newLimit) => {
    fetchProducts(id, 1, newLimit);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="mt-20 w-full h-32 bg-gradient-to-r from-[#2289FF] to-[#145299] shadow-md z-5 flex items-center text-white px-4 md:px-8 font-jost">
        <p className="flex flex-row text-sm md:text-base items-center gap-2">
          <Home size={16} className="text-sm" /> 
          <span>Home</span>
          <ChevronRight size={14} />
          <span>Products</span>
          {mainCategory && (
            <>
              <ChevronRight size={14} />
              <span className="font-medium">{mainCategory}</span>
            </>
          )}
        </p>
      </div>
      
      <main className="flex-grow pt-8 pb-12 relative z-10">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-4">
          {/* Breadcrumb */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <button 
              onClick={handleGoBack} 
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors self-start"
            >
              <ArrowLeft size={18} className="mr-2" />
              <span className="text-sm font-medium">Back</span>
            </button>
            
            <nav className="flex items-center text-sm">
              <div className="flex items-center text-gray-600">
                {breadcrumb.mainCategory && (
                  <>
                    <span className="hover:text-blue-600 cursor-pointer transition-colors">
                      {breadcrumb.mainCategory}
                    </span>
                    <ChevronRight size={14} className="mx-2 text-gray-400" />
                  </>
                )}
                {breadcrumb.category && (
                  <>
                    <span className="hover:text-blue-600 cursor-pointer transition-colors">
                      {breadcrumb.category}
                    </span>
                    {breadcrumb.subCategory && (
                      <>
                        <ChevronRight size={14} className="mx-2 text-gray-400" />
                        <span className="text-gray-800 font-medium">
                          {breadcrumb.subCategory}
                        </span>
                      </>
                    )}
                  </>
                )}
              </div>
            </nav>
          </div>

          {/* Page title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-8 font-jost">
            {breadcrumb.subCategory || breadcrumb.category || "Products"}
          </h1>

          {/* Products content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <Loader size={40} className="animate-spin mb-4 text-blue-600" />
                <p className="text-gray-600">Loading products...</p>
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <p className="text-red-500 mb-6">{error}</p>
                <button
                  onClick={() => fetchProducts(id)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Try Again
                </button>
              </div>
            ) : products.length > 0 ? (
              <div className="p-4 md:p-6 w-full">
                <ProductTable 
                  products={products} 
                  pagination={pagination}
                  onPageChange={handlePageChange}
                  onLimitChange={handleLimitChange}
                />
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 mb-6">No products found in this category.</p>
                <button
                  onClick={handleGoBack}
                  className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors text-sm font-medium"
                >
                  Go Back
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;