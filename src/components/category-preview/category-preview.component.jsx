import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../product-card/product-card.component";
import "./category-preview.style.scss";

export default function CategoryPreview({ title, products }) {
  return (
    <div className="category-preview-container">
      <h2>
        <Link className="title" to={title}>{title.toUpperCase()}</Link>
      </h2>
      <div className="preview">
        {products
          .filter((_, index) => {
            return index < 4;
          })
          .map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
      </div>
    </div>
  );
}
