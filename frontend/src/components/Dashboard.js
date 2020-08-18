import React from 'react';
import styled from '@emotion/styled';

import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  width: 100%;
  min-height: 100vh;
  background: #f7fafc;

  .main {
    display: grid;
    grid-template-columns: 300px 1fr;
  }
`;

export default function Dashboard({ children }) {
  return (
    <Wrapper>
      <Header />

      <main className="main">
        <Sidebar />
        <div>{children}</div>
      </main>

      <Footer />
    </Wrapper>
  );
}
