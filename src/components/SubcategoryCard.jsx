import React from "react";

const SubcategoryCard = ({ subcategory, onClick }) => {
  return (
    <div className="card" onClick={() => onClick(subcategory._id)}>
      <h3>{subcategory.name}</h3>
    </div>
  );
};

export default SubcategoryCard;
