import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { 
    setCategoryFilter, setArtisanFilter, setMaterialFilter, setOriginFilter, clearFilters 
} from '../../features/products/productSlice';
import { 
    selectUniqueCategories, selectUniqueArtisans, selectUniqueMaterials, selectUniqueOrigins 
} from '../../features/products/productSelectors';

const SidebarWrapper = styled.aside`
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  height: fit-content;
`;

const FilterGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  h4 {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    padding-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const FilterOption = styled.button`
    display: block;
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    padding: ${({ theme }) => theme.spacing.xs} 0;
    font-size: ${({ theme }) => theme.fontSizes.medium};
    color: ${({ theme, active }) => (active ? theme.colors.primary : theme.colors.text)};
    font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
    cursor: pointer;

    &:hover {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

const ClearButton = styled.button`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.secondary};
    &:hover {
        background-color: ${({ theme }) => theme.colors.primary};
    }
`;


const FilterSidebar = () => {
    const dispatch = useDispatch();
    const { category, artisan, material, origin } = useSelector(state => state.products.filters);

    const categories = useSelector(selectUniqueCategories);
    const artisans = useSelector(selectUniqueArtisans);
    const materials = useSelector(selectUniqueMaterials);
    const origins = useSelector(selectUniqueOrigins);

    return (
        <SidebarWrapper>
            <FilterGroup>
                <h4>Category</h4>
                {categories.map(c => (
                    <FilterOption key={c} active={category === c} onClick={() => dispatch(setCategoryFilter(c))}>{c}</FilterOption>
                ))}
            </FilterGroup>

            <FilterGroup>
                <h4>Artisan</h4>
                {artisans.map(a => (
                    <FilterOption key={a} active={artisan === a} onClick={() => dispatch(setArtisanFilter(a))}>{a}</FilterOption>
                ))}
            </FilterGroup>

             <FilterGroup>
                <h4>Material</h4>
                {materials.map(m => (
                    <FilterOption key={m} active={material === m} onClick={() => dispatch(setMaterialFilter(m))}>{m}</FilterOption>
                ))}
            </FilterGroup>

             <FilterGroup>
                <h4>Origin</h4>
                {origins.map(o => (
                    <FilterOption key={o} active={origin === o} onClick={() => dispatch(setOriginFilter(o))}>{o}</FilterOption>
                ))}
            </FilterGroup>
            
            <ClearButton onClick={() => dispatch(clearFilters())}>Clear Filters</ClearButton>
        </SidebarWrapper>
    );
};

export default FilterSidebar;