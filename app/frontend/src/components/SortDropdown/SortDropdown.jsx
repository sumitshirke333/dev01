import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setSortOrder } from '../../features/products/productSlice';

const SelectWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
`;

const StyledSelect = styled.select`
  padding: ${({ theme }) => theme.spacing.sm};
`;

const SortDropdown = () => {
  const dispatch = useDispatch();
  const sortOrder = useSelector((state) => state.products.sortOrder);

  const handleSortChange = (e) => {
    dispatch(setSortOrder(e.target.value));
  };

  return (
    <SelectWrapper>
      <label htmlFor="sort-order">Sort by:</label>
      <StyledSelect id="sort-order" value={sortOrder} onChange={handleSortChange}>
        <option value="default">Featured</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A-Z</option>
        <option value="rating-desc">Rating: High to Low</option>
      </StyledSelect>
    </SelectWrapper>
  );
};

export default SortDropdown;