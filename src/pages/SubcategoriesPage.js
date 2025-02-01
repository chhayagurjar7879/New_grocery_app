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
  const [productList, setProductList] = useState(null); // ✅ Updated: productList state added

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

  // ======================= neche bale function ko change kiya gaya h=============================
  const handleSubcategoryClick = async (subcategoryId) => {
    const products = await fetchProducts(categoryId, subcategoryId);

    if (products.length > 0) {
      setProductList(products); //  yadi products hote h to unko dikhaye
    } else {
      setProductList(null); //  products nahi mile to null  show kre
    }
    setShowProducts(true); // sub category k click hone p product list show ho
  };

  // =============== upar bale code me changes kiya h ============================

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

      {/* ✅ Product List ko dikhaya jaega */}
      {showProducts && (
        <div>
          <h3>Here’s your product list, please select</h3>
          <div className="cards-container">
            {productList === null ? ( // agar koi product nahi dikhai de jab
              <p>Sorry, इस Subcategory में कोई Product उपलब्ध नहीं है।</p>
            ) : (
              productList.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubcategoriesPage;
//  ye mera naya bala code h

