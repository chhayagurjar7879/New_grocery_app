import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSubcategories, fetchProducts } from "../api";
import SubcategoryCard from "../components/SubcategoryCard";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import '../../src/components/style/SubcategoriesPage.css'

const SubcategoriesPage = () => {
  const { categoryId } = useParams(); // Extract categoryId from URL params
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Subcategories based on categoryId
    fetchSubcategories(categoryId)
      .then((data) => {
        setSubcategories(data);
        if (data.length === 0) {
          // If no subcategories are available, fetch all products for the category
          fetchProducts(categoryId)
            .then((productsData) => {
              setProducts(productsData);
              setLoading(false); // Set loading false after products are fetched
            })
            .catch(() => setLoading(false)); // Handle any error by stopping the loading
        } else {
          setLoading(false); // Set loading false if subcategories are fetched
        }
      })
      .catch(() => setLoading(false)); // Handle error during subcategory fetch
  }, [categoryId]); // Dependency on categoryId, so it re-fetches when it changes

  const handleSubcategoryClick = (subcategoryId) => {
    setLoading(true); // Set loading true when subcategory is clicked
    fetchProducts(categoryId, subcategoryId)
      .then((productsData) => {
        setProducts(productsData);
        setLoading(false); // Set loading false after products are fetched for subcategory
      })
      .catch(() => setLoading(false)); // Handle any error by stopping the loading
  };

  if (loading) return <Loader />; // Display loading state until data is fetched

  return (
    <div className="container">
      <h1>Subcategories & Products</h1>
      
      {/* Render subcategories only if they exist */}
      {subcategories.length > 0 ? (
        <div className="cards-container">
          {subcategories.map((subcategory) => (
  <div className="card" key={subcategory._id} onClick={() => handleSubcategoryClick(subcategory._id)}>
    <div className="card-image">
      <img src="https://via.placeholder.com/150" alt="Placeholder" />
    </div>
    <div className="card-content">
      <h2 className="card-title">{subcategory.name}</h2> {/* Subcategory Name */}
    </div>
  </div>
))}

        </div>
      ) : (
        <h3>No subcategories available</h3> // Display message if no subcategories are found
      )}
      
      {/* Render products after fetching */}
      <div className="cards-container">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          )) ) : (
          <p>No products found</p> // Display message if no products are found
        )}
      </div>
    </div>
  );
};

export default SubcategoriesPage;
