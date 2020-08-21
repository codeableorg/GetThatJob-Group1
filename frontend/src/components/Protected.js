import React from 'react';
import styled from '@emotion/styled';
import { Redirect } from 'react-router-dom';

import Sidebar from './Sidebar';
import CurrentUser from './auth/CurrentUser';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  height: 100%;
  background: #f7fafc;
`;

const Protected = ({ children }) => {
  return (
    <CurrentUser>
      {({ loaded, currentUser }) => {
        if (!loaded) {
          return null;
        } else if (loaded && currentUser === null) {
          return <Redirect to="/sign-in" />;
        } else {
          return (
            <Wrapper>
              <Sidebar />
              {children}
            </Wrapper>
          );
        }
      }}
    </CurrentUser>
  );
};

export default Protected;
