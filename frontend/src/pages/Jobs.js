import React from 'react';
import styled from '@emotion/styled';

import Sidebar from '../components/Sidebar';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  height: 100%;
  background: #f7fafc;
`;

export default function Jobs() {
  return (
    <Wrapper>
      <Sidebar />
      <span>Jobs</span>
    </Wrapper>
  );
}
