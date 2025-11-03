import React from 'react';
import styled from 'styled-components';

const SelectorWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const Button = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  font-size: 1.2rem;
  padding: 0 ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  height: 40px;

  &:disabled {
    color: ${({ theme }) => theme.colors.border};
    cursor: not-allowed;
    background: transparent;
  }
`;

const Input = styled.input`
  width: 50px;
  text-align: center;
  border: none;
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  height: 40px;
  padding: 0;

  &:focus {
      outline: none;
  }

  /* Hide arrows in number input */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

const QuantitySelector = ({ quantity, setQuantity, maxStock }) => {
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < maxStock) {
      setQuantity(quantity + 1);
    }
  };

  const handleChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1) {
      value = 1;
    }
    if (value > maxStock) {
      value = maxStock;
    }
    setQuantity(value);
  };

  return (
    <SelectorWrapper>
      <Button onClick={handleDecrement} disabled={quantity <= 1}>-</Button>
      <Input type="number" value={quantity} onChange={handleChange} min="1" max={maxStock} />
      <Button onClick={handleIncrement} disabled={quantity >= maxStock}>+</Button>
    </SelectorWrapper>
  );
};

export default QuantitySelector;