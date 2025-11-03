import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { selectCartItems, selectCartTotal } from '../features/cart/cartSelectors';
import { placeOrder } from '../features/order/orderSlice';
import { clearCart } from '../features/cart/cartSlice';
import { formatPrice, generateOrderId } from '../utils/helpers';
import CustomAlertModal from '../components/CustomAlertModal/CustomAlertModal';

const PageWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
`;

const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-auto-flow: dense;
  }
`;

const FormSection = styled.div`
  @media (max-width: 768px) {
    grid-row: 2;
  }
`;

const SummarySection = styled.div`
    background-color: ${({ theme }) => theme.colors.surface};
    padding: ${({ theme }) => theme.spacing.lg};
    border-radius: ${({ theme }) => theme.borderRadius};
    height: fit-content;
    position: sticky;
    top: 120px;

    @media (max-width: 768px) {
        grid-row: 1;
        position: static;
        margin-bottom: ${({ theme }) => theme.spacing.lg};
    }
`;

const Form = styled.form``;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  label {
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    font-weight: 500;
  }
`;

const Input = styled.input`
  width: 100%;
`;

const RadioGroup = styled.div`
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius};
    padding: ${({ theme }) => theme.spacing.md};
`;

const PlaceOrderButton = styled.button`
    width: 100%;
    margin-top: 32px;
    padding: ${({ theme }) => theme.spacing.md};

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;


const CheckoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartItems = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);

    const [shippingDetails, setShippingDetails] = useState({ name: '', address: '', city: '', postalCode: ''});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setShippingDetails(prev => ({...prev, [id]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        // Generate a unique order ID on the frontend
        const newOrderId = generateOrderId();

        // Prepare the order data payload for the backend
        const orderData = {
            orderId: newOrderId,
            items: cartItems,
            total,
            shippingDetails
        };

        try {
            // Send the order data to the backend API
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                // If the server responds with an error, capture it
                const errorData = await response.json();
                throw new Error(errorData.msg || 'Failed to save the order.');
            }

            // If the order is saved successfully on the backend:
            // 1. Update Redux state for the confirmation page
            dispatch(placeOrder(orderData));
            // 2. Clear the cart
            dispatch(clearCart());
            // 3. Navigate to the confirmation page
            navigate('/order-confirmation');

        } catch (err) {
            console.error("Checkout Error:", err);
            setError(err.message || 'There was an issue connecting to our server. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <PageWrapper>
            <CustomAlertModal 
                show={!!error} 
                title="Order Error" 
                message={error} 
                onClose={() => setError(null)} 
            />
            <h2>Checkout</h2>
            <CheckoutGrid>
                <FormSection>
                    <Form onSubmit={handleSubmit}>
                        <h3>1. Shipping Details</h3>
                        <FormGroup>
                            <label htmlFor="name">Full Name</label>
                            <Input type="text" id="name" required value={shippingDetails.name} onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="address">Address</label>
                            <Input type="text" id="address" required value={shippingDetails.address} onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="city">City</label>
                            <Input type="text" id="city" required value={shippingDetails.city} onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="postalCode">Postal Code</label>
                            <Input type="text" id="postalCode" required value={shippingDetails.postalCode} onChange={handleInputChange} />
                        </FormGroup>
                        
                        <h3 style={{marginTop: '32px'}}>2. Payment Method (Simulated)</h3>
                        <RadioGroup>
                            <input type="radio" id="credit-card" name="payment" value="cc" defaultChecked />
                            <label htmlFor="credit-card" style={{marginLeft: '8px'}}> Credit Card (Simulated)</label>
                        </RadioGroup>

                        <PlaceOrderButton type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Placing Order...' : `Place Order - ${formatPrice(total)}`}
                        </PlaceOrderButton>
                    </Form>
                </FormSection>

                <SummarySection>
                    <h3>Order Summary</h3>
                    {cartItems.map(item => (
                        <div key={item.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', fontSize: '0.9rem'}}>
                            <span style={{flex: 1, marginRight: '8px'}}>{item.name} x {item.quantity}</span>
                            <span style={{textAlign: 'right'}}>{formatPrice(item.price * item.quantity)}</span>
                        </div>
                    ))}
                    <hr style={{margin: '16px 0', border: 'none', borderTop: '1px solid #eee'}}/>
                    <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem'}}>
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                    </div>
                </SummarySection>
            </CheckoutGrid>
        </PageWrapper>
    );
};

export default CheckoutPage;
