import { useState, useEffect } from "react";
import { Product } from "@utils/types";

const API_URL =
  "https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI";

interface FilterOption {
  identifier: string;
  displayValue: string;
  productCount: number;
  value: string | number | { gte?: number; lte?: number };
}

interface FilterCategory {
  identifier: string;
  displayName: string;
  priority: number;
  options: FilterOption[];
}

type FilterValue = string | number | boolean | { gte?: number; lte?: number };

interface SelectedFilters {
  [key: string]: FilterValue;
}

interface UseFetchProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  totalResults: number;
  filters: FilterCategory[];
}

const useFetchProducts = (
  query: string,
  pageNumber: number,
  size: number,
  sort: number,
  selectedFilters: SelectedFilters
): UseFetchProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [filters, setFilters] = useState<FilterCategory[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      // Format selectedFilters into facets for the API request
      const facets = Object.keys(selectedFilters).reduce((acc, key) => {
        acc[key] = [{ identifier: key, value: selectedFilters[key] }];
        return acc;
      }, {} as { [key: string]: Array<{ identifier: string; value: any }> });

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
            facets,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        // Set products and pagination details
        setProducts(data.products || []);
        setTotalResults(data.pagination.total || 0);

        // Only set filters once to retain the full list of options
        if (filters.length === 0) {
          setFilters(data.facets || []);
        }
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
  }, [query, pageNumber, size, sort, selectedFilters]); // Ensure selectedFilters triggers the fetch

  return { products, loading, error, totalResults, filters };
};

export default useFetchProducts;
