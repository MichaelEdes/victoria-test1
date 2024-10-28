import { useState, useEffect } from "react";
import { Product, UseFetchProductsResult, Facet } from "@utils/types";

const API_URL =
  "https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI";

const useFetchProducts = (
  query: string,
  pageNumber: number,
  size: number,
  sort: number,
  appliedFacets: Record<string, Array<{ id: string; value: any }>>
): UseFetchProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [facets, setFacets] = useState<Facet[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query,
            pageNumber,
            size,
            additionalPages: 0,
            sort,
            facets: appliedFacets,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data.products || []);
        setFacets(data.facets || []);
        setTotalResults(data.pagination.total || 0);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query, pageNumber, size, sort, appliedFacets]);

  return { products, loading, error, totalResults, facets };
};

export default useFetchProducts;
