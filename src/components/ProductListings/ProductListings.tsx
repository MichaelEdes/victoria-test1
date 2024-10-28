import React, { useState } from "react";
import ProductCard from "@components/ProductCard/ProductCard";
import { Product, FilterOption, FilterValue } from "@utils/types";
import useFetchProducts from "@hooks/useFetchProducts";
import "./ProductListings.scss";
import FilterDropdown from "@components/FilterDropdown/FilterDropdown";

interface SelectedFilters {
  [key: string]: FilterValue;
}

const ProductListings: React.FC = () => {
  const [sort, setSort] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({});
  const { products, loading, error, totalResults, filters } = useFetchProducts(
    "toilets",
    0,
    100,
    sort,
    selectedFilters
  );

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(Number(event.target.value));
  };

  const handleFilterSelect = (filterId: string, optionValue: FilterValue) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterId]: optionValue,
    }));
  };

  const handleClearFilters = () => {
    setSelectedFilters({});
  };

  const handleRemoveFilter = (filterId: string) => {
    setSelectedFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      delete newFilters[filterId];
      return newFilters;
    });
  };

  const getFilterLabel = (filterId: string) => {
    const filter = filters.find((f) => f.identifier === filterId);
    return filter ? filter.displayName : filterId;
  };

  const formatFilterValue = (value: FilterValue) => {
    if (typeof value === "object" && "gte" in value && "lte" in value) {
      return `${value.gte} - ${value.lte}`;
    }
    return String(value);
  };

  return (
    <div className="product-page-container">
      <h2>Product Listings</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="product-list-container">
        <div className="filter-container">
          <p>Filter By</p>
          {Object.keys(selectedFilters).length > 0 && (
            <div className="active-filters">
              <h4>Selected Filters:</h4>
              <ul>
                {Object.entries(selectedFilters).map(([key, value]) => (
                  <li key={key}>
                    <i
                      className="fa-solid fa-circle-xmark"
                      onClick={() => handleRemoveFilter(key)}
                      style={{ cursor: "pointer", marginRight: "5px" }}
                    ></i>
                    <strong>{getFilterLabel(key)}</strong>{" "}
                    {formatFilterValue(value)}
                  </li>
                ))}
              </ul>
              <button
                onClick={handleClearFilters}
                className="clear-filters-button"
              >
                Clear All
              </button>
            </div>
          )}
          <div className="filters">
            {filters.map((filter: FilterOption) => (
              <FilterDropdown
                key={filter.identifier}
                label={filter.displayName}
                options={filter.options.map((option) => ({
                  label: option.displayValue,
                  value: option.value,
                  count: option.productCount,
                }))}
                onSelect={(selectedOption) =>
                  handleFilterSelect(filter.identifier, selectedOption.value)
                }
              />
            ))}
          </div>
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
              ? products.map((product: Product, index: number) => (
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
