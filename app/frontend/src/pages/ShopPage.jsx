import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import FilterSidebar from '../components/FilterSidebar/FilterSidebar';
import ProductCard from '../components/ProductCard/ProductCard';
import SortDropdown from '../components/SortDropdown/SortDropdown';
import { selectFilteredAndSortedProducts } from '../features/products/productSelectors';
import { setSearchQuery } from '../features/products/productSlice';

const ShopPageWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 1024px) {
    grid-template-columns: 220px 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.main``;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SearchInput = styled.input`
    min-width: 250px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const NoResultsMessage = styled.p`
    text-align: center;
    padding: ${({ theme }) => theme.spacing.xl};
    color: ${({ theme }) => theme.colors.subtleText};
`;


const ShopPage = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectFilteredAndSortedProducts);
    const { searchQuery } = useSelector(state => state.products.filters);

    return (
        <ShopPageWrapper>
            <FilterSidebar />
            <MainContent>
                <TopBar>
                    <SearchInput 
                        type="text" 
                        placeholder="Search by name, artisan..."
                        value={searchQuery}
                        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                    />
                    <SortDropdown />
                </TopBar>
                
                {products.length > 0 ? (
                    <ProductGrid>
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </ProductGrid>
                ) : (
                    <NoResultsMessage>
                        No products match your criteria. Try adjusting your filters.
                    </NoResultsMessage>
                )}
            </MainContent>
        </ShopPageWrapper>
    );
};

export default ShopPage;