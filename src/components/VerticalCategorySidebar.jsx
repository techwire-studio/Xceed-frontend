import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, Loader, ExternalLink } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/products";

const VerticalCategorySidebar = ({ initialState = {} }) => {
  const navigate = useNavigate();
  const [expandedMainCategory, setExpandedMainCategory] = useState(initialState.mainCategory || null);
  const [expandedCategory, setExpandedCategory] = useState(initialState.category || null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(initialState.subCategory || null);
  const [categoriesHierarchy, setCategoriesHierarchy] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch categories hierarchy on component mount
  useEffect(() => {
    fetchCategoriesHierarchy();
  }, []);

  const fetchCategoriesHierarchy = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${API_URL}/categories`);
      setCategoriesHierarchy(res.data.data || []);
    } catch (err) {
      setError("Failed to load categories");
      console.error("Error fetching categories hierarchy:", err);
    } finally {
      setLoading(false);
    }
  };

  // Toggle expansion of a main category
  const toggleMainCategory = (mainCategory) => {
    setExpandedMainCategory(expandedMainCategory === mainCategory ? null : mainCategory);
    if (expandedMainCategory !== mainCategory) {
      setExpandedCategory(null);
    }
  };

  // Toggle expansion of a category
  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  // Navigate to products page when selecting a category or subcategory
  const navigateToProducts = (id, type, breadcrumb) => {
    navigate(`/products/${type}/${id}`, { 
      state: { 
        breadcrumb,
        id,
        type
      }
    });
  };

  // Handle selection of a category with no subcategories
  const handleCategorySelect = (mainCategory, category) => {
    const subCategories = category.subCategories || [];
    
    if (subCategories.length === 0) {
      // Navigate directly to category products
      navigateToProducts(category.id, "category", {
        mainCategory: mainCategory.mainCategory,
        category: category.category,
        subCategory: ""
      });
    } else {
      // Toggle the category expansion to show subcategories
      toggleCategory(category.category);
    }
  };

  // Handle selection of a subcategory
  const handleSubCategorySelect = (mainCategory, category, subCategory) => {
    setSelectedSubCategory(subCategory.subCategory);
    navigateToProducts(subCategory.id, "subcategory", {
      mainCategory: mainCategory.mainCategory,
      category: category.category,
      subCategory: subCategory.subCategory
    });
  };

  if (loading) {
    return (
      <div className="bg-[#2289FF] rounded-lg p-4 flex items-center justify-center h-40">
        <Loader size={24} className="animate-spin text-white" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#2289FF] rounded-lg p-4">
        <p className="text-white mb-2">{error}</p>
        <button 
          onClick={fetchCategoriesHierarchy} 
          className="px-3 py-1 bg-white text-[#2289FF] text-sm rounded hover:bg-gray-100"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#2289FF] rounded-lg shadow-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-blue-600">
        <h3 className="text-lg font-medium text-white">Categories</h3>
      </div>
      <div className="p-2 max-h-[70vh] overflow-y-auto">
        <ul className="space-y-1">
          {categoriesHierarchy.map((mainCategory) => (
            <li key={mainCategory.mainCategory || `main-${Math.random()}`} className="rounded overflow-hidden">
              {/* Main Category */}
              <button
                onClick={() => toggleMainCategory(mainCategory.mainCategory)}
                className={`w-full px-3 py-2 flex items-center justify-between ${
                  expandedMainCategory === mainCategory.mainCategory ? 'bg-black text-white' : 'text-white hover:bg-black hover:bg-opacity-50'
                } transition-colors rounded-t`}
              >
                <span className="font-medium">{mainCategory.mainCategory}</span>
                {expandedMainCategory === mainCategory.mainCategory ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </button>
              
              {/* Categories */}
              {expandedMainCategory === mainCategory.mainCategory && (
                <div className="pl-2">
                  <ul className="bg-black bg-opacity-50 rounded-b">
                    {mainCategory.categories && mainCategory.categories.map((category) => (
                      <li key={category.category || `cat-${Math.random()}`} className="rounded overflow-hidden">
                        {/* Category */}
                        <button
                          onClick={() => handleCategorySelect(mainCategory, category)}
                          className={`w-full px-3 py-2 flex items-center justify-between ${
                            expandedCategory === category.category ? 'bg-[#1428A1] text-white' : 'text-white hover:bg-[#1428A1] hover:bg-opacity-70'
                          } transition-colors ${category.subCategories?.length ? '' : 'rounded-b'}`}
                        >
                          <span>{category.category}</span>
                          {category.subCategories && category.subCategories.length > 0 ? (
                            expandedCategory === category.category ? (
                              <ChevronDown size={16} />
                            ) : (
                              <ChevronRight size={16} />
                            )
                          ) : (
                            <ExternalLink size={14} />
                          )}
                        </button>
                        
                        {/* Subcategories */}
                        {expandedCategory === category.category && category.subCategories && (
                          <ul className="bg-white rounded-b p-1">
                            {category.subCategories.map((subCategory) => (
                              <li key={subCategory.id || `sub-${Math.random()}`}>
                                <button
                                  onClick={() => handleSubCategorySelect(mainCategory, category, subCategory)}
                                  className={`w-full px-3 py-2 text-left flex items-center justify-between text-gray-800 hover:bg-gray-100 rounded ${
                                    selectedSubCategory === subCategory.subCategory ? 'font-medium text-[#1428A1]' : ''
                                  }`}
                                >
                                  <span>{subCategory.subCategory || "Uncategorized"}</span>
                                  <ExternalLink size={14} className="text-gray-400" />
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VerticalCategorySidebar;