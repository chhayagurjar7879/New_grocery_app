import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="card">
      <h3>{product.item}</h3>
      <p>Price: ₹{product.purchasePrice}</p>
    </div>
  );
};

export default ProductCard;
