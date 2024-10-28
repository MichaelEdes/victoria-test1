import React, { useState, useEffect } from "react";
import ProductCard from "@components/ProductCard/ProductCard";
import { Product } from "@utils/types";
import useFetchProducts from "@hooks/useFetchProducts";
import FilterDropdown from "@components/FilterDropdown/FilterDropdown";
import "./ProductListings.scss";

interface FacetOption {
  identifier: string;
  displayValue: string;
  productCount: number;
  value: any;
}

interface Facet {
  identifier: string;
  displayName: string;
  options: FacetOption[];
}

const ProductListings: React.FC = () => {
  const [sort, setSort] = useState(1);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(30);

  const [appliedFacets, setAppliedFacets] = useState<
    Record<string, Array<{ id: string; value: any }>>
  >({});

  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const [defaultFacets, setDefaultFacets] = useState<Facet[]>([]);

  const { products, loading, error, totalResults, facets } = useFetchProducts(
    "toilets",
    pageNumber,
    pageSize,
    sort,
    appliedFacets
  );

  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);

  useEffect(() => {
    setDisplayedProducts((prevProducts) => [...prevProducts, ...products]);
  }, [products]);

  useEffect(() => {
    if (facets.length > 0 && defaultFacets.length === 0) {
      setDefaultFacets(facets);
    }
  }, [facets, defaultFacets]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(Number(event.target.value));
    setPageNumber(0);
    setDisplayedProducts([]);
  };

  const handleViewMore = () => {
    setPageNumber((prevPage) => prevPage + 1);
  };

  const toggleFacet = (
    facetIdentifier: string,
    optionId: string,
    optionValue: any
  ) => {
    setAppliedFacets((prev) => {
      const facetOptions = prev[facetIdentifier] || [];
      const isSelected = facetOptions.some((opt) => opt.id === optionId);

      const updatedFacetOptions = isSelected
        ? facetOptions.filter((opt) => opt.id !== optionId)
        : [...facetOptions, { id: optionId, value: optionValue }];

      const newAppliedFacets = {
        ...prev,
        [facetIdentifier]: updatedFacetOptions,
      };

      Object.keys(newAppliedFacets).forEach((key) => {
        if (newAppliedFacets[key].length === 0) {
          delete newAppliedFacets[key];
        }
      });

      return newAppliedFacets;
    });

    setPageNumber(0);
    setDisplayedProducts([]);
  };

  const clearAllFilters = () => {
    setAppliedFacets({});
    setMinPrice("");
    setMaxPrice("");
    setPageNumber(0);
    setDisplayedProducts([]);
  };

  const applyPriceFilter = (e: React.FormEvent) => {
    e.preventDefault();

    if (minPrice === "" && maxPrice === "") return;

    const priceRange = {
      id: "priceRange",
      value: { gte: minPrice || 0, lte: maxPrice || Infinity },
    };

    setAppliedFacets((prev) => ({
      ...prev,
      prices: [priceRange],
    }));

    setPageNumber(0);
    setDisplayedProducts([]);
  };

  const getDisplayName = (facetIdentifier: string) => {
    const facet = defaultFacets.find((f) => f.identifier === facetIdentifier);
    return facet ? facet.displayName : facetIdentifier;
  };

  return (
    <div className="product-page-container">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="product-list-container">
        <div className="filter-container">
          <p className="filter-title">Filter By</p>
          {Object.keys(appliedFacets).length > 0 && (
            <div className="active-filters">
              <h4>Active Filters:</h4>
              <ul>
                {Object.entries(appliedFacets).map(
                  ([facetIdentifier, options]) =>
                    options.map((option) => (
                      <li key={option.id}>
                        <button
                          onClick={() =>
                            toggleFacet(
                              facetIdentifier,
                              option.id,
                              option.value
                            )
                          }
                        >
                          <i className="fa-solid fa-circle-xmark"></i>
                        </button>
                        <p>
                          <strong>{getDisplayName(facetIdentifier)}: </strong>
                          {option.value.gte !== undefined &&
                          option.value.lte !== undefined
                            ? `${option.value.gte} - ${option.value.lte}`
                            : option.value}
                        </p>
                      </li>
                    ))
                )}
              </ul>
              <button className="clear" onClick={clearAllFilters}>
                Clear All Filters
              </button>
            </div>
          )}
          <div className="filters">
            <form className="custom-price" onSubmit={applyPriceFilter}>
              <input
                type="number"
                placeholder="£Min"
                step={100}
                min={0}
                value={minPrice}
                onChange={(e) =>
                  setMinPrice(e.target.value ? parseInt(e.target.value) : "")
                }
              />
              <input
                type="number"
                min={0}
                step={100}
                placeholder="£Max"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(e.target.value ? parseInt(e.target.value) : "")
                }
              />
              <button
                disabled={minPrice === "" && maxPrice === ""}
                type="submit"
              >
                Go
              </button>
            </form>
            {defaultFacets.length > 0 ? (
              defaultFacets.map((facet) => (
                <FilterDropdown
                  key={facet.identifier}
                  label={facet.displayName}
                  options={facet.options.map((option) => ({
                    label: option.displayValue,
                    value: option.value,
                    count: option.productCount,
                  }))}
                  selectedOptions={
                    appliedFacets[facet.identifier]?.map((opt) => opt.value) ||
                    []
                  }
                  onSelect={(selectedOption) =>
                    toggleFacet(
                      facet.identifier,
                      selectedOption.label,
                      selectedOption.value
                    )
                  }
                />
              ))
            ) : (
              <p>No filters available</p>
            )}
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
            {displayedProducts.length > 0
              ? displayedProducts.map((product: Product, index: number) => (
                  <ProductCard key={index} product={product} />
                ))
              : !loading && <p>No products found.</p>}
          </div>
          <div className="pagination">
            <p>
              You've viewed {displayedProducts.length} out of {totalResults}{" "}
              results
            </p>
            {displayedProducts.length < totalResults && (
              <button onClick={handleViewMore}>Load More</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListings;
