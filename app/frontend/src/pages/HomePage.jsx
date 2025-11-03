import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard/ProductCard';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PageContainer = styled.div`
  animation: ${fadeIn} 0.8s ease-out;
`;

const HeroSection = styled.section`
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('https://placehold.co/1600x900/D4C9B8/5A4B3A?text=Serene+Setting');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 0 ${({ theme }) => theme.spacing.lg};

  h1 {
    font-size: 3.5rem;
    color: white;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.4);
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.large};
    margin-top: ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: 768px) {
    h1 { font-size: 2.5rem; }
  }
`;

const StyledButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius};
  text-decoration: none;
  font-weight: bold;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    background-color: #f1ede6;
    transform: translateY(-2px);
  }
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: ${({ theme }) => theme.spacing.xl} auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  text-align: center;

  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const EthosTeaser = styled.div`
    background-color: ${({ theme }) => theme.colors.surface};
    padding: ${({ theme }) => theme.spacing.xl};
    margin-top: ${({ theme }) => theme.spacing.xl};
    border-radius: ${({ theme }) => theme.borderRadius};
    box-shadow: ${({ theme }) => theme.shadows.soft};

    p {
        max-width: 600px;
        margin: ${({ theme }) => theme.spacing.md} auto;
        color: ${({ theme }) => theme.colors.subtleText};
    }
`;


const HomePage = () => {
    const products = useSelector(state => state.products.allProducts);
    const featuredProducts = products.filter(p => p.rating > 4.8).slice(0, 3);
    const newArrivals = [...products].reverse().slice(0, 3);
    
    return (
        <PageContainer>
            <HeroSection>
                <h1>Where Every Object Tells a Story.</h1>
                <p>Discover ethically sourced, handcrafted goods for a conscious lifestyle.</p>
                <StyledButton to="/shop">Explore Collections</StyledButton>
            </HeroSection>

            <ContentSection>
                <h2>Featured Products</h2>
                <ProductGrid>
                    {featuredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </ProductGrid>
            </ContentSection>

             <ContentSection>
                <h2>New Arrivals</h2>
                <ProductGrid>
                    {newArrivals.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </ProductGrid>
            </ContentSection>

            <ContentSection>
                 <EthosTeaser>
                    <h2>Our Ethos</h2>
                    <p>We believe in the beauty of craftsmanship, the importance of sustainability, and the power of conscious consumption to create a better world.</p>
                    <StyledButton to="/our-ethos">Learn More</StyledButton>
                </EthosTeaser>
            </ContentSection>

        </PageContainer>
    );
};

export default HomePage;