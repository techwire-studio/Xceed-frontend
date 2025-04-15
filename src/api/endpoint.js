const API_BASE_URL = "https://localhost:5000/api"; // Replace with the actual base URL of your API

export const endpoints = {
  fetchCategories: `${API_BASE_URL}/categories`,
  fetchSubcategories: (categoryId) => `${API_BASE_URL}/categories/${categoryId}/subcategories`,
  fetchProducts: (subcategoryId) => `${API_BASE_URL}/subcategories/${subcategoryId}/products`,
  fetchProductAttributes: (productId) => `${API_BASE_URL}/products/${productId}/attributes`,
};