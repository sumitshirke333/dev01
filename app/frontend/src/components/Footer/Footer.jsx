import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const FooterContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FooterLinks = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  a {
    color: ${({ theme }) => theme.colors.background};
    margin: 0 ${({ theme }) => theme.spacing.md};
    &:hover {
        text-decoration: underline;
    }
  }
`;

const Copyright = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.border};
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <h3>Glossary</h3>
        <p>"Where Every Object Tells a Story."</p>
        <FooterLinks>
          <Link to="/shop">Shop</Link>
          <Link to="/our-ethos">Our Ethos</Link>
          <Link to="/connect">Connect</Link>
        </FooterLinks>
        <Copyright>&copy; {new Date().getFullYear()} Glossary. All Rights Reserved. A Fictional E-Commerce Project.</Copyright>
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;