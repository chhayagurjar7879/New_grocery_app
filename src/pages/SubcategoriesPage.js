import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSubcategories, fetchProducts } from "../api";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import '../../src/components/style/SubcategoriesPage.css';

const SubcategoriesPage = () => {
  const { categoryId } = useParams(); // Extract categoryId from URL params
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProducts, setShowProducts] = useState(false); // To toggle product list display
  const [noSubcategories, setNoSubcategories] = useState(false); // To manage display when no subcategories

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading

      try {
        const data = await fetchSubcategories(categoryId);
        if (data.length > 0) {
          setSubcategories(data);
          setNoSubcategories(false); // Set to false when subcategories are available
        } else {
          setSubcategories([]); // Reset subcategories if no valid data
          setNoSubcategories(true); // Set to true if no subcategories exist
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        setSubcategories([]); // Reset on error
        setNoSubcategories(true); // Set to true if error occurs
      } finally {
        setLoading(false); // Stop loading after fetching data
      }
    };

    fetchData();
  }, [categoryId]); // Fetch data again if categoryId changes

  const handleSubcategoryClick = async (subcategoryId) => {
    setLoading(true); // Set loading to true when fetching products
    try {
      const productsData = await fetchProducts(categoryId, subcategoryId);
      setProducts(productsData);
      setShowProducts(true); // Show products for the selected subcategory
    } catch (error) {
      console.error("Error fetching products for subcategory:", error);
    } finally {
      setLoading(false); // Stop loading after fetching products
    }
  };

  const handleShowAllProducts = async () => {
    setLoading(true); // Set loading to true when fetching all products
    try {
      const productsData = await fetchProducts(categoryId);
      setProducts(productsData);
      setShowProducts(true); // Show all products
    } catch (error) {
      console.error("Error fetching all products:", error);
    } finally {
      setLoading(false); // Stop loading after fetching all products
    }
  };

  if (loading) return <Loader />; // Display loading state until data is fetched

  return (
    <div className="container">
      <h1>Subcategories & Products</h1>

      {/* Display message when there are no subcategories */}
      {noSubcategories && (
        <div>
          <h3>Sorry, it has no subcategory</h3>
          <button className="show-products-button" onClick={handleShowAllProducts}>
            Show other products
          </button>
        </div>
      )}

      {/* Render subcategories if they exist */}
      {subcategories.length > 0 && !showProducts && !noSubcategories && (
        <div className="cards-container">
          {subcategories.map((subcategory) => (
            <div
              className="card"
              key={subcategory._id}
              onClick={() => handleSubcategoryClick(subcategory._id)}
            >
              <div className="card-image">
                <img src="https://via.placeholder.com/150" alt="Placeholder" />
              </div>
              <div className="card-content">
                <h2 className="card-title">{subcategory.name}</h2>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Render product list */}
      {showProducts && (
        <div>
          <h3>Here’s your product list, please select</h3>
          <div className="cards-container">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubcategoriesPage;



