import React from "react";
// import "./CategoryCard.css";
import '../components/style/index.css'

const CategoryCard = ({ category, onClick }) => {
  return (
    <div className="card" onClick={() => onClick(category._id)}>
      <h3>{category.name}</h3>
    </div>
  );
};

export default CategoryCard;
