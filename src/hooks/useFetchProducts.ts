// hooks/useFetchProducts.ts
import { useState, useEffect } from "react";
import { Product } from "@utils/types";

const API_URL =
  "https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI";

interface UseFetchProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  totalResults: number;
}

const useFetchProducts = (
  query: string,
  pageNumber: number,
  size: number,
  sort: number // Added sort parameter
): UseFetchProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);

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
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data.products || []);
        setTotalResults(data.pagination.total || 0);
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

    fetchProducts();
  }, [query, pageNumber, size, sort]);

  return { products, loading, error, totalResults };
};

export default useFetchProducts;
