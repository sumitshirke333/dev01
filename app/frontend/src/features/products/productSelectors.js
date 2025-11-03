import { createSelector } from '@reduxjs/toolkit';

const selectAllProducts = (state) => state.products.allProducts;
const selectFilters = (state) => state.products.filters;
const selectSortOrder = (state) => state.products.sortOrder;

export const selectFilteredAndSortedProducts = createSelector(
  [selectAllProducts, selectFilters, selectSortOrder],
  (products, filters, sortOrder) => {
    let filteredProducts = [...products];

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.short_description.toLowerCase().includes(query) ||
          p.artisan.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (filters.category !== 'All') {
      filteredProducts = filteredProducts.filter((p) => p.category === filters.category);
    }

    // Filter by artisan
    if (filters.artisan !== 'All') {
        filteredProducts = filteredProducts.filter((p) => p.artisan === filters.artisan);
    }
    
    // Filter by material
    if (filters.material !== 'All') {
        filteredProducts = filteredProducts.filter((p) => p.material === filters.material);
    }

    // Filter by origin
    if (filters.origin !== 'All') {
        filteredProducts = filteredProducts.filter((p) => p.origin_country === filters.origin);
    }
    
    // Filter by price range
    filteredProducts = filteredProducts.filter(
        p => p.price >= filters.priceRange.min && p.price <= filters.priceRange.max
    );

    // Sort products
    switch (sortOrder) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating-desc':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default sort (can be by id or as is)
        break;
    }
    
    return filteredProducts;
  }
);

export const selectProductById = (productId) =>
  createSelector([selectAllProducts], (products) =>
    products.find((p) => p.id === productId)
  );

// Selectors for filter options
export const selectUniqueCategories = createSelector(
    [selectAllProducts],
    (products) => ['All', ...new Set(products.map(p => p.category))]
);
export const selectUniqueArtisans = createSelector(
    [selectAllProducts],
    (products) => ['All', ...new Set(products.map(p => p.artisan))]
);
export const selectUniqueMaterials = createSelector(
    [selectAllProducts],
    (products) => ['All', ...new Set(products.map(p => p.material))]
);
export const selectUniqueOrigins = createSelector(
    [selectAllProducts],
    (products) => ['All', ...new Set(products.map(p => p.origin_country))]
);