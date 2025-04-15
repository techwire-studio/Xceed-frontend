import { useState, useMemo, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { FileText, ChevronDown, ChevronUp, Filter, Search, X } from "lucide-react";

const ProductTable = ({ products, pagination, onPageChange, onLimitChange }) => {
  const [expandedProduct, setExpandedProduct] = useState(null);
  const { addToCart } = useCart();
  const [filters, setFilters] = useState({});
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [pendingFilters, setPendingFilters] = useState({});
  const [pendingSearchTerm, setPendingSearchTerm] = useState("");
  const [filterApplied, setFilterApplied] = useState(false);

  // Extract all unique specification keys from all products
  const specificationColumns = useMemo(() => {
    if (!products || products.length === 0) return [];
    
    const specKeys = new Set();
    products.forEach(product => {
      if (product.specifications) {
        Object.keys(product.specifications).forEach(key => specKeys.add(key));
      }
    });
    
    return Array.from(specKeys).sort();
  }, [products]);

  // Filter out columns where all products have "-" or missing values
  const visibleSpecColumns = useMemo(() => {
    if (!products || products.length === 0) return [];
    
    return specificationColumns.filter(specKey => {
      // Check if at least one product has a non-empty value for this spec
      return products.some(product => {
        return product.specifications && 
               product.specifications[specKey] && 
               product.specifications[specKey] !== "-";
      });
    });
  }, [products, specificationColumns]);

  // Extract unique values for each specification for filter options
  const filterOptions = useMemo(() => {
    const options = {};
    
    visibleSpecColumns.forEach(specKey => {
      const uniqueValues = new Set();
      
      products.forEach(product => {
        if (product.specifications && product.specifications[specKey]) {
          uniqueValues.add(product.specifications[specKey]);
        }
      });
      
      options[specKey] = Array.from(uniqueValues).sort();
    });
    
    return options;
  }, [products, visibleSpecColumns]);

  // Determine which specs have multiple values and should have filters
  const filterableSpecs = useMemo(() => {
    return Object.entries(filterOptions)
      .filter(([_, values]) => values.length > 1)
      .map(([key]) => key);
  }, [filterOptions]);

  // Initialize pendingFilters with the same structure as filters
  useEffect(() => {
    setPendingFilters(filters);
    setPendingSearchTerm(searchTerm);
  }, []);

  // Apply filters and search to products
  useEffect(() => {
    if (!products) return;
    
    const filtered = products.filter(product => {
      // Check if product matches all active filters
      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        // If no filter value is selected, don't filter on this property
        if (!value) return true;
        
        // Check if the product's specification matches the filter
        return product.specifications && product.specifications[key] === value;
      });
      
      // Check if product matches search term
      const matchesSearch = searchTerm.trim() === "" || 
        (product.id && product.id.toLowerCase().includes(searchTerm.toLowerCase())) ||
        Object.entries(product.specifications || {}).some(([key, value]) => 
          value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      
      // Product must match both filters and search
      return matchesFilters && matchesSearch;
    });
    
    setFilteredProducts(filtered);
  }, [products, filters, searchTerm]);

  const handleFilterChange = (specKey, value) => {
    setPendingFilters(prev => ({
      ...prev,
      [specKey]: value
    }));
  };

  const handleSearchChange = (value) => {
    setPendingSearchTerm(value);
  };

  const applyFilters = () => {
    setFilters(pendingFilters);
    setSearchTerm(pendingSearchTerm);
    setFilterApplied(true);
  };

  const resetFilters = () => {
    setFilters({});
    setSearchTerm("");
    setPendingFilters({});
    setPendingSearchTerm("");
    setFilterApplied(false);
  };

  const hasActiveFilters = Object.values(filters).some(value => value) || searchTerm.trim() !== "";
  const hasPendingChanges = JSON.stringify(pendingFilters) !== JSON.stringify(filters) || 
                           pendingSearchTerm !== searchTerm;

  if (!products || products.length === 0) {
    return <div className="p-4 text-center text-gray-500">No products found in this category.</div>;
  }

  return (
    <div className="w-full">
      {/* Search and Filter Controls */}
      <div className="mb-6">
        {/* Search bar */}
        <div className="flex mb-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-500" />
            </div>
            <input
              type="text"
              value={pendingSearchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search by product ID or specifications..."
            />
          </div>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="bg-red-600 hover:bg-red-700 text-white px-4 flex items-center justify-center rounded-r"
            >
              <X size={18} className="mr-1" />
              Reset
            </button>
          )}
        </div>

        {/* Filter boxes - only show filters for specifications with multiple values */}
        {filterableSpecs.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {filterableSpecs.map(specKey => (
              <div key={`filter-${specKey}`} className="bg-white rounded shadow p-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {specKey}
                </label>
                <select 
                  className="w-full border border-gray-300 rounded p-2 text-sm"
                  value={pendingFilters[specKey] || ""}
                  onChange={(e) => handleFilterChange(specKey, e.target.value || null)}
                >
                  <option value="">All</option>
                  {filterOptions[specKey]?.map(value => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search Button */}
      <button 
        className="mb-4 flex items-center text-sm border-2 py-2 px-6 text-white bg-blue-700 hover:bg-black" 
        onClick={applyFilters}
        disabled={!hasPendingChanges && filterApplied}
      >
        <Search size={16} className="mr-2" />
        Search
      </button>

      {/* Results count */}
      <div className="mb-4 text-sm">
        Showing {filteredProducts.length} of {products.length} products
      </div>

      {/* Pagination - Now positioned between filters and table */}
      {pagination && pagination.totalPages > 1 && (
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-b border-gray-200 py-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              Previous
            </button>
            <span className="text-gray-600 text-sm">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button
              onClick={() => onPageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage >= pagination.totalPages}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              Next
            </button>
          </div>
          
          {/* Results per page selector */}
          <div className="flex items-center gap-2">
            <label htmlFor="resultsPerPage" className="text-sm text-gray-600">
              Show:
            </label>
            <select
              id="resultsPerPage"
              className="border border-gray-300 rounded py-1 px-2 text-sm"
              value={pagination.limit || 20}
              onChange={(e) => onLimitChange(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-gray-600">per page</span>
          </div>
        </div>
      )}

      {/* Product table with borders */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full border-collapse table-fixed bg-white border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              {/* Product No. column header */}
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider w-40 border border-gray-600">
                Product No.
              </th>
              {/* Only show specification columns with actual values */}
              {visibleSpecColumns.map(specKey => (
                <th 
                  key={specKey} 
                  className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider w-24 border border-gray-600"
                >
                  {specKey}
                </th>
              ))}
              <th className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wider w-24 border border-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, idx) => (
                <tr key={product.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  {/* Product No. with PDF icon */}
                  <td className="px-3 py-3 text-sm font-medium text-gray-900 border border-gray-300">
                    <div className="flex items-center gap-2">
                      {product.datasheetLink && (
                        <a
                          href={product.datasheetLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-600 hover:text-red-800 flex-shrink-0"
                        >
                          <FileText size={18} />
                        </a>
                      )}
                      <span>{product.id || "-"}</span>
                    </div>
                  </td>
                  {/* Only show specification values for visible columns */}
                  {visibleSpecColumns.map(specKey => (
                    <td 
                      key={`${product.id}-${specKey}`} 
                      className="px-3 py-3 text-sm text-center text-gray-500 border border-gray-300"
                    >
                      {product.specifications?.[specKey] || "-"}
                    </td>
                  ))}
                  <td className="px-3 py-3 text-sm border border-gray-300">
                    <div className="flex justify-center gap-2">
                      <button
                        className="inline-flex justify-center items-center py-3 text-xs font-medium bg-[#1428A1] text-white hover:bg-black w-28"
                        onClick={() => addToCart(product)}
                      >
                        Add to Quote
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={visibleSpecColumns.length + 2} className="px-3 py-6 text-center text-gray-500 border border-gray-300">
                  No products match your search criteria. Try adjusting your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;