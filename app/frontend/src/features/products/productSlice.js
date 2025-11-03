import { createSlice } from '@reduxjs/toolkit';
import { products as allProducts } from '../../data/products';

const initialState = {
  allProducts,
  filters: {
    searchQuery: '',
    category: 'All',
    artisan: 'All',
    material: 'All',
    origin: 'All',
    priceRange: { min: 0, max: 200 },
  },
  sortOrder: 'default',
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.filters.searchQuery = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.filters.category = action.payload;
    },
    setArtisanFilter: (state, action) => {
      state.filters.artisan = action.payload;
    },
    setMaterialFilter: (state, action) => {
        state.filters.material = action.payload;
    },
    setOriginFilter: (state, action) => {
        state.filters.origin = action.payload;
    },
    setPriceRangeFilter: (state, action) => {
        state.filters.priceRange = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    clearFilters: (state) => {
        state.filters = initialState.filters;
        state.sortOrder = initialState.sortOrder;
    }
  },
});

export const {
  setSearchQuery,
  setCategoryFilter,
  setArtisanFilter,
  setMaterialFilter,
  setOriginFilter,
  setPriceRangeFilter,
  setSortOrder,
  clearFilters
} = productSlice.actions;

export default productSlice.reducer;