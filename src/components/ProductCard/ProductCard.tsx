// ProductCard.tsx
import React from "react";
import { Product } from "@utils/types"; // Adjust path as needed
import "./ProductCard.scss";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const currencySymbol =
    product.price.currencyCode === "GBP"
      ? "£"
      : product.price.currencyCode === "USD"
      ? "$"
      : product.price.currencyCode;

  function formatDate(dateString: string): string {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    // Format the day with suffix (e.g., 1st, 2nd, 3rd, etc.)
    const daySuffix = (day: number) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${day}${daySuffix(day)} ${month} ${year}`;
  }

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image.url} alt={product.image.imageAltText} />
        {product.attributes.isBestSeller && (
          <p className="best-seller">Best Seller</p>
        )}
        {product.attributes.isShortProjection && (
          <p className="space-saver">Space Saver</p>
        )}
        {product.price.isOnPromotion && <p className="sale">Sale</p>}
      </div>

      <div className="content">
        <div className="product-title">
          <div>
            <img
              src={product.brand.brandImage.url}
              alt={product.brand.brandImage.attributes.imageAltText}
            />
            <h3 className="name">{product.productName}</h3>
          </div>
          <i className="fa-regular fa-heart"></i>
        </div>
        <div className="price">
          <p className="now">
            {currencySymbol}
            {product.price.priceIncTax}
          </p>
          {product.price.isOnPromotion && (
            <p className="was">
              was {currencySymbol}
              {product.price.wasPriceIncTax}
            </p>
          )}
        </div>
        {product.price.monthlyFinanceEstimate && (
          <p className="finance">
            Finance from {currencySymbol}
            {product.price.monthlyFinanceEstimate}/month
          </p>
        )}
        <div className="stock">
          {product.stockStatus.status === "G" ? (
            <p className="in">
              <i className="fa-solid fa-circle-check"></i> In Stock
            </p>
          ) : (
            <p className="out">
              <i className="fa-solid fa-calendar-xmark"></i> due{" "}
              {formatDate(product.stockStatus.eta)}
            </p>
          )}
        </div>
        {product.reviewsCount > 0 && (
          <div className="reviews">
            {product.averageRating} <i className="fa-solid fa-star"></i>{" "}
            {product.reviewsCount} Reviews
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
