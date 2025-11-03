import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/helpers';

const CardWrapper = styled(Link)`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
    border-color: ${({ theme }) => theme.colors.border};
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  padding-top: 100%; // 1:1 Aspect Ratio
  position: relative;
  background-color: #f0f0f0;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InfoWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const ArtisanName = styled.p`
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.subtleText};
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 0;
`;

const ProductName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.large};
  margin: ${({ theme }) => theme.spacing.xs} 0;
  font-weight: 400;
`;

const Price = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

const ProductCard = ({ product }) => {
  return (
    <CardWrapper to={`/products/${product.id}`}>
      <ImageWrapper>
        <img src={product.imageUrl[0]} alt={product.name} />
      </ImageWrapper>
      <InfoWrapper>
        <ArtisanName>{product.artisan}</ArtisanName>
        <ProductName>{product.name}</ProductName>
        <Price>{formatPrice(product.price)}</Price>
      </InfoWrapper>
    </CardWrapper>
  );
};

export default ProductCard;