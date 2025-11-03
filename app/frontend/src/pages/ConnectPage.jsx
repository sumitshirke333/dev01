import React, { useState } from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormWrapper = styled.div``;
const InfoWrapper = styled.div`
    background-color: ${({ theme }) => theme.colors.surface};
    padding: ${({ theme }) => theme.spacing.lg};
    border-radius: ${({ theme }) => theme.borderRadius};
`;

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

const Textarea = styled.textarea`
  width: 100%;
  min-height: 150px;
  resize: vertical;
`;

const SuccessMessage = styled.p`
    color: ${({ theme }) => theme.colors.accent};
    font-weight: bold;
    text-align: center;
`;

const ConnectPage = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        setSubmitted(true);
    };

    return (
        <PageWrapper>
            <FormWrapper>
                <h2>Get In Touch</h2>
                <p>Have a question or a comment? We'd love to hear from you.</p>
                
                {submitted ? (
                    <SuccessMessage>Thank you for your message! We'll get back to you soon.</SuccessMessage>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <FormGroup>
                            <label htmlFor="name">Name</label>
                            <Input type="text" id="name" required />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="email">Email</label>
                            <Input type="email" id="email" required />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="subject">Subject</label>
                            <Input type="text" id="subject" required />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="message">Message</label>
                            <Textarea id="message" required></Textarea>
                        </FormGroup>
                        <button type="submit">Send Message</button>
                    </form>
                )}
            </FormWrapper>
            <InfoWrapper>
                <h3>Contact Information</h3>
                <p>
                    <strong>Email:</strong><br />
                    <a href="mailto:care@glossary.example.com">care@glossary.example.com</a>
                </p>
                <p>
                    <strong>Phone:</strong><br />
                    +1 (234) 567-8900
                </p>
                <p>
                    <strong>Address:</strong><br />
                    123 Artisan Way<br />
                    Craftsville, CA 90210<br />
                    United States
                </p>
                <p><em>(Please note: This is an address for a project.)</em></p>
            </InfoWrapper>
        </PageWrapper>
    );
};

export default ConnectPage;