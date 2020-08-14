import React from 'react';
import styled from '@emotion/styled';

import Header from './Header';
import Footer from './Footer';

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  width: 100%;
  min-height: 100vh;
`;

export default function Layout({ children }) {
  return (
    <Wrapper>
      <Header />
      {children}
      <Footer />
    </Wrapper>
  );
}
