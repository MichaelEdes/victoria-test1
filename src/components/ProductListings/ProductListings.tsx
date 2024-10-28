import React, { useState, useEffect } from "react";
import ProductCard from "@components/ProductCard/ProductCard";
import { Product } from "@utils/types";
import useFetchProducts from "@hooks/useFetchProducts";
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
  const [pageSize] = useState(30);

  const [appliedFacets, setAppliedFacets] = useState<
    Record<string, Array<{ id: string; value: any; displayValue: string }>>
  >({});

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
    setDisplayedProducts(products);
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
    optionValue: any,
    displayValue: string
  ) => {
    setAppliedFacets((prev) => {
      const facetOptions = prev[facetIdentifier] || [];
      const isSelected = facetOptions.some((opt) => opt.id === optionId);

      const updatedFacetOptions = isSelected
        ? facetOptions.filter((opt) => opt.id !== optionId)
        : [...facetOptions, { id: optionId, value: optionValue, displayValue }];

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

  // Clear all filters
  const clearAllFilters = () => {
    setAppliedFacets({});
    setPageNumber(0);
    setDisplayedProducts([]);
  };

  return (
    <div className="product-page-container">
      <h2>Product Listings</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="product-list-container">
        <div className="filter-container">
          {/* Active Filters Section */}
          {Object.keys(appliedFacets).length > 0 && (
            <div className="active-filters">
              <h4>Active Filters:</h4>
              <>
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
                                option.value,
                                option.displayValue
                              )
                            }
                          >
                            <i className="fa-solid fa-circle-xmark"></i>
                          </button>
                          <p>
                            <strong>{facetIdentifier} </strong>
                            {option.displayValue}
                          </p>
                        </li>
                      ))
                  )}
                </ul>
                <button onClick={clearAllFilters}>Clear All Filters</button>
              </>
            </div>
          )}
          {/* Filter By Section */}
          <p>Filter By</p>
          {defaultFacets.length > 0 ? (
            defaultFacets.map((facet) => (
              <div key={facet.identifier} className="facet">
                <h4>{facet.displayName}</h4>
                <ul>
                  {facet.options.map((option: FacetOption) => (
                    <li key={option.identifier}>
                      <label>
                        <input
                          type="checkbox"
                          checked={
                            appliedFacets[facet.identifier]?.some(
                              (opt) => opt.id === option.identifier
                            ) || false
                          }
                          onChange={() =>
                            toggleFacet(
                              facet.identifier,
                              option.identifier,
                              option.value,
                              option.displayValue
                            )
                          }
                        />
                        {option.displayValue} ({option.productCount})
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>No filters available</p>
          )}
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
