import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectCartItemCount } from '../../features/cart/cartSelectors';

// A simple SVG logo
const Logo = () => (
    <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="5" y="30" fontFamily="Lora, serif" fontSize="24" fill="#5A4B3A">Glossary</text>
    </svg>
);


const HeaderWrapper = styled.header`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Nav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const StyledNavLink = styled(NavLink)`
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: ${({ theme }) => theme.colors.accent};
    transition: width 0.3s;
  }

  &.active, &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &.active::after, &:hover::after {
    width: 100%;
  }
`;

const CartLink = styled(Link)`
    position: relative;
    color: ${({ theme }) => theme.colors.text};
    &:hover {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

const CartCount = styled.span`
    position: absolute;
    top: -8px;
    right: -12px;
    background-color: ${({ theme }) => theme.colors.accent};
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: bold;
`;


const Header = () => {
  const cartItemCount = useSelector(selectCartItemCount);

  return (
    <HeaderWrapper>
      <Link to="/"><Logo /></Link>
      <Nav>
        <StyledNavLink to="/">Home</StyledNavLink>
        <StyledNavLink to="/shop">Shop</StyledNavLink>
        <StyledNavLink to="/our-ethos">Our Ethos</StyledNavLink>
        <StyledNavLink to="/connect">Connect</StyledNavLink>
      </Nav>
      <CartLink to="/cart">
        Cart
        {cartItemCount > 0 && <CartCount>{cartItemCount}</CartCount>}
      </CartLink>
    </HeaderWrapper>
  );
};

export default Header;