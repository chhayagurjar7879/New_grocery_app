const BASE_URL = "https://groceryapi.knewxerp.co.in/api";// base url

export const fetchCategories = async () => {
    const response = await fetch(`${BASE_URL}/categories`);
    const data = await response.json(); // Parse JSON response
    
    // Check if the categories key exists and is an array
    if (data && Array.isArray(data.categories)) {
      return data.categories; // Return the categories array
    } else {
      console.error("Categories API did not return a valid array:", data);
      return []; // Return empty array if the data is invalid
    }
  };
  // =========================================================================================================
  

  export const fetchSubcategories = async (categoryId) => {
    try {
        const response = await fetch(`${BASE_URL}/subcategories/${categoryId}`);
        const data = await response.json(); // Parse JSON response
        
        console.log('API Response:', data);  // Log the full API response for debugging

        // Check if the data contains a valid subcategories array
        if (data && Array.isArray(data.subcategories) && data.subcategories.length > 0) {
            return data.subcategories; // Return the subcategories array if valid
        } else if (Array.isArray(data) && data.length > 0) {
            // If the response is an array directly (without a "subcategories" key)
            return data;
        } else {
            console.error("Subcategories API did not return a valid array:", data);
            return []; // Return empty array if the data is invalid or empty
        }
    } catch (error) {
        console.error("Error fetching subcategories:", error);
        return []; // Return empty array in case of error
    }
};

  
// ======================================================================

export const fetchProducts = async (categoryId, subcategoryId) => {
    const url = subcategoryId
      ? `${BASE_URL}/products?subcategoryId=${subcategoryId}`
      : `${BASE_URL}/products?categoryId=${categoryId}`;
  
    const response = await fetch(url);
    const data = await response.json();
  
    // Check if the response has products and if it is an array
    if (data && Array.isArray(data.products)) {
      return data.products; // Return the products array
    } else {
      console.error("Products API did not return a valid array:", data);
      return []; // Return empty array if the data is invalid
    }
  };
