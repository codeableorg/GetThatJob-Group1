import React, { Fragment } from 'react';
import { Container } from './auth/StyledComponents';

const Auth = ({ children }) => {
  return (
    <Fragment>
      <Container>{children}</Container>
    </Fragment>
  );
};

export default Auth;
