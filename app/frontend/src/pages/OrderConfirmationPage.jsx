import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { selectCurrentOrder } from '../features/order/orderSelectors';
import { formatPrice } from '../utils/helpers';

const PageWrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  text-align: center;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const OrderId = styled.p`
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.background};
    padding: ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.borderRadius};
    display: inline-block;
    margin-top: ${({ theme }) => theme.spacing.md};
`;

const ContinueButton = styled(Link)`
    display: inline-block;
    margin-top: ${({ theme }) => theme.spacing.lg};
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.surface};
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
    border-radius: ${({ theme }) => theme.borderRadius};
    text-decoration: none;
`;

const OrderConfirmationPage = () => {
  const order = useSelector(selectCurrentOrder);

  // If there's no order data (e.g., user navigated here directly), redirect to home
  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <PageWrapper>
      <h2>Your order has been placed!</h2>
      <p>Thank you for supporting conscious craftsmanship.</p>
      <p>Your Order ID is:</p>
      <OrderId>#{order.orderId}</OrderId>
      
      <div style={{marginTop: '32px', textAlign: 'left', borderTop: '1px solid #eee', paddingTop: '16px'}}>
          <h4>Order Summary</h4>
          <p><strong>Total Amount:</strong> {formatPrice(order.total)}</p>
          <p><strong>Shipping to:</strong></p>
          <p>
              {order.shippingDetails.name}<br/>
              {order.shippingDetails.address}<br/>
              {order.shippingDetails.city}, {order.shippingDetails.postalCode}
          </p>
      </div>
      
      <ContinueButton to="/">Continue Shopping</ContinueButton>
    </PageWrapper>
  );
};

export default OrderConfirmationPage;