import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  h2 {
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }

  p {
    line-height: 1.8;
    color: ${({ theme }) => theme.colors.subtleText};
  }
`;

const OurEthosPage = () => {
  return (
    <PageWrapper>
      <Section>
        <h2>Our Ethos</h2>
        <p>At Glossary, we believe that the objects we bring into our lives should be more than just functional. They should tell a story, connect us to the maker, and reflect a commitment to a healthier planet. Our philosophy is built on three core pillars: conscious craftsmanship, sustainable sourcing, and timeless design.</p>
      </Section>
      <Section>
        <h3>Our Mission</h3>
        <p>Our mission is to curate a collection of beautiful, ethically made goods that inspire a more mindful and sustainable way of living. We seek out independent artisans and small studios who share our values, providing them with a platform to reach a wider audience while preserving their traditional skills.</p>
      </Section>
      <Section>
        <h3>Our Makers</h3>
        <p>We partner with a community of talented artisans from around the world. These are the weavers, potters, woodworkers, and candlemakers whose hands shape every item we offer. We believe in fair partnerships, ensuring our makers are paid a living wage that honors their skill and dedication.</p>
      </Section>
      <Section>
        <h3>Our Materials</h3>
        <p>From GOTS-certified organic cotton to reclaimed wood and locally sourced clay, we prioritize materials that are natural, renewable, recycled, or biodegradable. We are committed to minimizing our environmental footprint by choosing materials that are kind to the earth, from their creation to the end of their lifecycle.</p>
      </Section>
       <Section>
        <h3>Our Impact</h3>
        <p>We see business as a force for good. By choosing Glossary, you are not just acquiring a beautiful object; you are supporting small-scale economies, preserving artisanal heritage, and making a conscious choice for a more sustainable future. Thank you for being part of our story.</p>
      </Section>
    </PageWrapper>
  );
};

export default OurEthosPage;