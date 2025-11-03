import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { selectProductById } from '../features/products/productSelectors';
import { formatPrice } from '../utils/helpers';
import QuantitySelector from '../components/QuantitySelector/QuantitySelector';
import { addToCart } from '../features/cart/cartSlice';

const PageWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: flex-start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageGallery = styled.div`
    img {
        width: 100%;
        border-radius: ${({ theme }) => theme.borderRadius};
        margin-bottom: ${({ theme }) => theme.spacing.md};
        box-shadow: ${({ theme }) => theme.shadows.soft};
    }
`;

const ProductInfo = styled.div`
    position: sticky;
    top: 120px; /* Adjust based on header height */
`;

const Artisan = styled.h4`
    color: ${({ theme }) => theme.colors.subtleText};
    font-weight: 500;
`;

const ProductName = styled.h1`
    margin: ${({ theme }) => theme.spacing.sm} 0;
`;

const Price = styled.p`
    font-size: ${({ theme }) => theme.fontSizes.large};
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
`;

const StockStatus = styled.p`
    font-weight: bold;
    color: ${({ stock }) => stock > 0 ? '#4caf50' : ({ theme }) => theme.colors.error};
`;

const Section = styled.section`
    margin-top: ${({ theme }) => theme.spacing.lg};
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    padding-top: ${({ theme }) => theme.spacing.lg};
`;

const AddToCartWrapper = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.md};
    margin-top: ${({ theme }) => theme.spacing.lg};
`;

const AddToCartButton = styled.button`
    flex-grow: 1;
`;

const Notification = styled.div`
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${({ theme }) => theme.colors.accent};
    color: white;
    padding: ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius};
    box-shadow: ${({ theme }) => theme.shadows.medium};
    z-index: 100;
    opacity: ${({ show }) => (show ? 1 : 0)};
    transition: opacity 0.5s;
`;


const ProductStoryPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(selectProductById(id));
    
    const [quantity, setQuantity] = useState(1);
    const [showNotification, setShowNotification] = useState(false);

    if (!product) {
        return <PageWrapper><h2>Product not found</h2></PageWrapper>;
    }

    const handleAddToCart = () => {
        dispatch(addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            imageUrl: product.imageUrl[0],
        }));

        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    return (
        <PageWrapper>
            <ProductGrid>
                <ImageGallery>
                    {product.imageUrl.map((url, index) => (
                        <img key={index} src={url} alt={`${product.name} - view ${index + 1}`} />
                    ))}
                </ImageGallery>
                <ProductInfo>
                    <Artisan>{product.artisan}</Artisan>
                    <ProductName>{product.name}</ProductName>
                    <Price>{formatPrice(product.price)}</Price>
                    <p>{product.long_description}</p>
                    <StockStatus stock={product.stock}>
                        {product.stock > 0 ? `${product.stock} In Stock` : 'Out of Stock'}
                    </StockStatus>

                    {product.stock > 0 && (
                        <AddToCartWrapper>
                            <QuantitySelector quantity={quantity} setQuantity={setQuantity} maxStock={product.stock} />
                            <AddToCartButton onClick={handleAddToCart}>
                                Add to Cart
                            </AddToCartButton>
                        </AddToCartWrapper>
                    )}
                    
                    <Section>
                        <h4>The Artisan's Touch</h4>
                        <p>{product.artisan_story}</p>
                    </Section>
                    
                    <Section>
                        <h4>Conscious Craftsmanship</h4>
                        <p>{product.sustainability_notes}</p>
                    </Section>

                    <Section>
                        <h4>Details</h4>
                        <ul>
                            <li><strong>Material:</strong> {product.material}</li>
                            <li><strong>Origin:</strong> {product.origin_country}</li>
                            <li><strong>Dimensions:</strong> {product.dimensions}</li>
                        </ul>
                    </Section>
                </ProductInfo>
            </ProductGrid>
            <Notification show={showNotification}>
                Item added to cart!
            </Notification>
        </PageWrapper>
    );
};

export default ProductStoryPage;