// ProductListings.tsx
import React, { useState, useEffect } from "react";
import ProductCard from "@components/ProductCard/ProductCard";
import "./ProductListings.scss";
import { Product } from "@utils/types";

const ProductListings: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: "toilets",
            pageNumber: 0,
            size: 100,
            additionalPages: 0,
            sort: 1,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-list-container">
      <h2>Product Listings</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="product-list">
        {products.length > 0
          ? products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
          : !loading && <p>No products found.</p>}
      </div>
    </div>
  );
};

export default ProductListings;
