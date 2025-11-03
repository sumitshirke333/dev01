import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../features/cart/cartSlice';
import { selectCartItems, selectCartSubtotal, selectShippingCost, selectCartTotal } from '../features/cart/cartSelectors';
import { formatPrice } from '../utils/helpers';
import QuantitySelector from '../components/QuantitySelector/QuantitySelector';

const PageWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
`;

const CartGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: flex-start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CartItems = styled.div``;
const Summary = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  position: sticky;
  top: 120px;
`;

const CartItem = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const ItemImage = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.borderRadius};
`;

const ItemInfo = styled.div`
    flex-grow: 1;
`;

const ItemActions = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
`;

const RemoveButton = styled.button`
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.subtleText};
    font-size: ${({ theme }) => theme.fontSizes.small};
    text-decoration: underline;
    padding: 0;

    &:hover {
        color: ${({ theme }) => theme.colors.error};
    }
`;

const EmptyCartMessage = styled.div`
    text-align: center;
    padding: ${({ theme }) => theme.spacing.xl};

    h3 {
        margin-bottom: ${({ theme }) => theme.spacing.md};
    }
`;

const SummaryRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme, isTotal }) => isTotal ? theme.fontSizes.large : theme.fontSizes.medium};
    font-weight: ${({ isTotal }) => isTotal ? 'bold' : 'normal'};
`;

const CheckoutButton = styled.button`
    width: 100%;
    margin-top: ${({ theme }) => theme.spacing.md};
    padding: ${({ theme }) => theme.spacing.md};
`;

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector(selectCartItems);
    const subtotal = useSelector(selectCartSubtotal);
    const shippingCost = useSelector(selectShippingCost);
    const total = useSelector(selectCartTotal);

    if (cartItems.length === 0) {
        return (
            <PageWrapper>
                <EmptyCartMessage>
                    <h3>Your Cart is Empty</h3>
                    <p>Looks like you haven't added any items yet.</p>
                    <Link to="/shop">
                        <CheckoutButton>Continue Shopping</CheckoutButton>
                    </Link>
                </EmptyCartMessage>
            </PageWrapper>
        );
    }
    
    return (
        <PageWrapper>
            <h2>Your Cart</h2>
            <CartGrid>
                <CartItems>
                    {cartItems.map(item => (
                        <CartItem key={item.id}>
                            <ItemImage src={item.imageUrl} alt={item.name} />
                            <ItemInfo>
                                <h4>{item.name}</h4>
                                <p>{formatPrice(item.price)}</p>
                                <QuantitySelector 
                                    quantity={item.quantity}
                                    setQuantity={(qty) => dispatch(updateQuantity({id: item.id, quantity: qty}))}
                                    maxStock={100} // Assuming max stock here, for a real app, you'd get this from product data
                                />
                            </ItemInfo>
                            <ItemActions>
                                <p>{formatPrice(item.price * item.quantity)}</p>
                                <RemoveButton onClick={() => dispatch(removeFromCart(item.id))}>
                                    Remove
                                </RemoveButton>
                            </ItemActions>
                        </CartItem>
                    ))}
                </CartItems>
                <Summary>
                    <h3>Order Summary</h3>
                    <SummaryRow>
                        <span>Subtotal</span>
                        <span>{formatPrice(subtotal)}</span>
                    </SummaryRow>
                    <SummaryRow>
                        <span>Shipping</span>
                        <span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
                    </SummaryRow>
                     <SummaryRow isTotal>
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                    </SummaryRow>
                    <CheckoutButton onClick={() => navigate('/checkout')}>Proceed to Checkout</CheckoutButton>
                </Summary>
            </CartGrid>
        </PageWrapper>
    );
};

export default CartPage;