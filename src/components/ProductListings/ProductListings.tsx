// ProductListings.tsx
import React, { useState } from "react";
import ProductCard from "@components/ProductCard/ProductCard";
import { Product } from "@utils/types";
import useFetchProducts from "@hooks/useFetchProducts";
import "./ProductListings.scss";

const ProductListings: React.FC = () => {
  const [sort, setSort] = useState(1); // Initialize sort with "recommended" option
  const { products, loading, error, totalResults } = useFetchProducts(
    "toilets",
    0,
    100,
    sort
  );
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(Number(event.target.value));
  };

  return (
    <div className="product-page-container">
      <h2>Product Listings</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="product-list-container">
        <div className="filter-container">
          <p>Filter By</p>
          <div className="filters"></div>
        </div>
        <div>
          <div className="data">
            <div className="sort">
              <p>Sort By</p>
              <select value={sort} onChange={handleSortChange}>
                <option value={1}>Recommended</option>
                <option value={2}>Lowest Price</option>
                <option value={3}>Highest Price</option>
                <option value={4}>Highest Discount</option>
              </select>
            </div>
            <p>{totalResults} results</p>
          </div>
          <div className="product-list">
            {products.length > 0
              ? products.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))
              : !loading && <p>No products found.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListings;
