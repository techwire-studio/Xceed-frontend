import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, Loader, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CatalogSidebar = ({ 
  isOpen, 
  onClose, 
  categoriesHierarchy = [], 
  loading = false, 
  error = null,
  refetchCategories
}) => {
  const navigate = useNavigate();
  const [hoveredMainCategory, setHoveredMainCategory] = useState(null);
  const [selectedMainCategory, setSelectedMainCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [stage, setStage] = useState("main"); // "main", "category", "subcategory"
  const [skippedCategorySelection, setSkippedCategorySelection] = useState(false);

  // Reset state when sidebar is closed
  useEffect(() => {
    if (!isOpen) {
      setHoveredMainCategory(null);
      setSelectedMainCategory(null);
      setSelectedCategory(null);
      setSelectedSubCategory(null);
      setCategories([]);
      setSubCategories([]);
      setStage("main");
      setSkippedCategorySelection(false);
    }
  }, [isOpen]);

  const handleMainCategoryHover = (mainCategory) => {
    setHoveredMainCategory(mainCategory);
  };

  const handleMainCategoryLeave = () => {
    setHoveredMainCategory(null);
  };

  const handleMainCategoryClick = (mainCategory) => {
    setSelectedMainCategory(mainCategory);
    setStage("category");
    
    // Handle different category structures
    if (!mainCategory.categories) {
      // If no categories, go directly to products
      navigateToProducts(mainCategory.id, "main");
      return;
    }

    // Process categories based on structure
    const processedCategories = Array.isArray(mainCategory.categories) 
      ? mainCategory.categories.map(cat => {
          // Check if this is a direct subcategory or a category with subcategories
          if (cat.subCategory) {
            return {
              ...cat,
              isSubCategory: true,
              category: cat.subCategory
            };
          }
          return cat;
        })
      : [];
    
    setCategories(processedCategories);
    
    // If there are no subcategories or just one category that is actually a subcategory,
    // go directly to products
    if (processedCategories.length === 0) {
      navigateToProducts(mainCategory.id, "main");
    } else if (processedCategories.length === 1 && processedCategories[0].isSubCategory) {
      setSelectedCategory(processedCategories[0]);
      setSkippedCategorySelection(true);
      navigateToProducts(processedCategories[0].id, "subcategory");
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    
    // If this category has subcategories, show them
    if (category.subCategories && category.subCategories.length > 0) {
      setStage("subcategory");
      setSubCategories(category.subCategories);
    } else {
      // Otherwise go to products
      navigateToProducts(category.id, "category");
    }
  };

  const handleSubCategorySelect = (subCategory) => {
    setSelectedSubCategory(subCategory);
    navigateToProducts(subCategory.id, "subcategory");
  };

  const navigateToProducts = (id, type) => {
    // Close sidebar
    onClose();
    
    // Navigate to products page with appropriate parameters
    navigate(`/products/${id}`);
  };

  const goBack = () => {
    if (stage === "subcategory") {
      setStage("category");
      setSelectedSubCategory(null);
    } else if (stage === "category") {
      setStage("main");
      setSelectedCategory(null);
      setSelectedMainCategory(null);
      setSkippedCategorySelection(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 overflow-hidden font-lexend" style={{ marginTop: "49px", pointerEvents: isOpen ? 'auto' : 'none' }}>
      {/* Backdrop - only capture clicks when sidebar is open */}
      {isOpen && (
        <div
          className="absolute inset-0 bg-transparent transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <div className="absolute top-4 bottom-4 left-0 flex">
        {/* Main Categories Sidebar - always visible when open */}
        {isOpen && (
          <div className="w-64 bg-[#2289FF] text-white shadow-xl rounded-l-lg overflow-hidden h-screen">
            <div className="h-screen flex flex-col">
              {/* Content */}
              <div className="flex-grow overflow-y-auto">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <Loader size={32} className="animate-spin mb-4" />
                    <p>Loading categories...</p>
                  </div>
                ) : error ? (
                  <div className="px-6 py-4 m-4 text-red-400 bg-gray-800 rounded-lg">
                    <p>{error}</p>
                    <button
                      className="mt-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
                      onClick={refetchCategories}
                    >
                      Retry
                    </button>
                  </div>
                ) : (
                  <ul className="py-2">
                    {categoriesHierarchy.map((mainCategory) => (
                      <li 
                        key={mainCategory.mainCategory || `main-${Math.random()}`}
                        className="relative"
                        onMouseEnter={() => handleMainCategoryHover(mainCategory)}
                        onMouseLeave={handleMainCategoryLeave}
                      >
                        <button
                          className={`w-full px-6 py-3 text-left flex items-center justify-between hover:bg-black transition-colors group ${
                            hoveredMainCategory?.mainCategory === mainCategory.mainCategory ? 'bg-black' : ''
                          }`}
                          onClick={() => handleMainCategoryClick(mainCategory)}
                        >
                          <span className="group-hover:text-white transition-colors">
                            {mainCategory.mainCategory}
                          </span>
                          {mainCategory.categories ? (
                            <ChevronRight
                              size={18}
                              className="text-white transition-colors"
                            />
                          ) : (
                            <ExternalLink 
                              size={16} 
                              className="text-white transition-colors" 
                            />
                          )}
                        </button>
                        
                        {/* Rest of the component remains the same */}
                        {/* Show category panel on hover */}
                        {hoveredMainCategory?.mainCategory === mainCategory.mainCategory && mainCategory.categories?.length > 0 && (
                          <div className="absolute left-full top-0 w-64 bg-gradient-to-b from-gray-800 to-gray-700 min-h-[200px] shadow-xl rounded-r-lg overflow-hidden z-10">
                            {/* ... existing hover panel code ... */}
                            <div className=" flex flex-col">
                              <div className="px-6 py-4 border-b border-gray-700">
                                <h3 className="text-lg font-medium">{mainCategory.mainCategory}</h3>
                              </div>
                              <div className="flex-grow overflow-y-auto p-1">
                                <ul className="py-2">
                                  {mainCategory.categories.map((category) => {
                                    // Check if it's a direct subcategory
                                    if (category.subCategory) {
                                      return (
                                        <li key={`hover-subcategory-${category.id || Math.random()}`}>
                                          <button
                                            className="w-full px-6 py-3 text-left flex items-center justify-between hover:bg-gray-800 transition-colors group"
                                            onClick={() => navigateToProducts(category.id, "subcategory")}
                                          >
                                            <span className="group-hover:text-blue-300 transition-colors">
                                              {category.subCategory}
                                            </span>
                                            <ExternalLink size={16} className="text-white transition-colors" />
                                          </button>
                                        </li>
                                      );
                                    }
                                    
                                    // Regular category with potential subcategories
                                    return (
                                      <li key={`hover-category-${category.category || Math.random()}`}>
                                        <button
                                          className="w-full px-6 py-3 text-left flex items-center justify-between hover:bg-gray-800 transition-colors group"
                                          onClick={() => handleCategorySelect(category)}
                                        >
                                          <span className="group-hover:text-blue-300 transition-colors">
                                            {category.category}
                                          </span>
                                          {category.subCategories && category.subCategories.length > 0 ? (
                                            <ChevronRight
                                              size={18}
                                              className="text-white"
                                            />
                                          ) : (
                                            <ExternalLink size={16} className="text-white" />
                                          )}
                                        </button>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Rest of the component remains the same */}
        {/* Categories Sidebar - appears when category is selected */}
        {isOpen && (stage === "category" || stage === "subcategory") && (
          <div className="w-fit min-w-100 bg-black text-white shadow-xl overflow-hidden h-screen">
            {/* ... existing category sidebar code ... */}
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="px-6 py-4 flex justify-between items-center border-b border-gray-700">
                <h2 className="text-xl font-bold">
                  {skippedCategorySelection && categories[0]?.isSubCategory
                    ? `${selectedMainCategory?.mainCategory || ""} - ${selectedCategory?.category || ""}`
                    : selectedMainCategory?.mainCategory || "Categories"}
                </h2>
                <button 
                  onClick={goBack}
                  className="p-1 rounded-full hover:bg-gray-700"
                >
                  <ChevronLeft size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-grow overflow-y-auto">
                <ul className="py-2">
                  {categories.map((item) => (
                    <li key={item.isSubCategory ? `subcategory-${item.id || Math.random()}` : `category-${item.category || Math.random()}`}>
                      <button
                        className="w-full px-6 py-3 text-left flex items-center justify-between hover:bg-[#1428A1] transition-colors group"
                        onClick={() => {
                          if (item.isSubCategory) {
                            // Handle subcategory click
                            setSelectedSubCategory(item);
                            navigateToProducts(item.id, "subcategory");
                          } else {
                            // Normal category handling
                            handleCategorySelect(item);
                          }
                        }}
                      >
                        <span className="group-hover:text-white transition-colors">
                          {item.isSubCategory ? (item.subCategory || item.category) : item.category}
                        </span>
                        {!item.isSubCategory && item.subCategories && item.subCategories.length > 0 ? (
                          <ChevronRight
                            size={18}
                            className="transition-colors"
                          />
                        ) : (
                          <ExternalLink size={16} className=" transition-colors" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Subcategories Sidebar */}
        {isOpen && stage === "subcategory" && (
          <div className="min-w-100 bg-white text-white shadow-xl overflow-hidden rounded-r-lg h-screen">
            {/* ... existing subcategory sidebar code ... */}
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="px-6 py-4 flex justify-between items-center border-b border-gray-700">
                <h2 className="text-xl font-bold text-[#1428A1]">{selectedCategory?.category || "Subcategories"}</h2>
                <button 
                  onClick={goBack}
                  className="p-1 rounded-full hover:bg-gray-100 text-gray-700"
                >
                  <ChevronLeft size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-grow overflow-y-auto">
                <ul className="py-2">
                  {subCategories.map((subCategory) => (
                    <li key={subCategory.id || `subcategory-${Math.random()}`}>
                      <button
                        className="w-full px-6 py-3 text-left flex items-center justify-between hover:bg-black transition-colors group text-black"
                        onClick={() => handleSubCategorySelect(subCategory)}
                      >
                        <span className="group-hover:text-white transition-colors">
                          {subCategory.subCategory || "Uncategorized"}
                        </span>
                        <ExternalLink size={16} className="text-gray-500 group-hover:text-white transition-colors" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogSidebar;