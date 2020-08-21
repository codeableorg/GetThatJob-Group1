import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import Sidebar from './Sidebar';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  height: 100%;
  background: #f7fafc;
`;

const Protected = ({ children }) => {
  return (
    <Fragment>
      <Wrapper>
        <Sidebar />
        {children}
      </Wrapper>
    </Fragment>
  );
};

export default Protected;
