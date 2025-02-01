const BASE_URL = "https://groceryapi.knewxerp.co.in/api";  // base url

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
    let url = `${BASE_URL}/products/all/filter`;

    // URL में categoryId और subcategoryId को ऐड करें
    if (categoryId && subcategoryId) {
        url += `?categoryId=${categoryId}&subcategoryId=${subcategoryId}`;
    } else if (categoryId) {
        url += `?categoryId=${categoryId}`;
    } else if (subcategoryId) {
        url += `?subcategoryId=${subcategoryId}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log("Fetched Products Response:", data); // Debugging के लिए 

        // यदि `data.products` एक सही array है, तो उसे return करें
        if (data && Array.isArray(data) && data.length > 0) {
            return data; // उपलब्ध products की लिस्ट return करें
        } else {
            console.error("Products API से सही डेटा नहीं मिला:", data);
            return null; // यदि कोई product नहीं है, तो null return करें
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        return null; // यदि API में error हो, तो null return करें
    }
};
