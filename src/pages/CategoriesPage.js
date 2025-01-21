import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../api";
import CategoryCard from "../components/CategoryCard";
import Loader from "../components/Loader";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]); // State for categories
  const [loading, setLoading] = useState(true); // State for loading spinner
  const navigate = useNavigate(); // To handle navigation

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data); // Set the categories
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array to run only once on mount

  // While data is being fetched, show the Loader
  if (loading) return <Loader />;

  return (
    <div className="container">
      <h1 className="page-title">Categories</h1>
      <div className="cards-container">
        {/* Render category cards */}
        {categories.length > 0 ? (
          categories.map((category) => (
            <div className="card" key={category._id} onClick={() => navigate(`/subcategory/${category._id}`)}>
              <div className="card-image">
                {/* Placeholder for the image */}
                <img src="https://via.placeholder.com/150" alt="Placeholder" />
              </div>
              <div className="card-content">
                <h2 className="card-title">{category.name}</h2>
              </div>
            </div>
          ))
        ) : (
          <p className="no-categories">No categories found</p> // Display message if no categories are found
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;