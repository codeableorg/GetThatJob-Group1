import React from 'react';
import { Redirect } from 'react-router-dom';

import { Container } from './auth/StyledComponents';
import CurrentUser from './auth/CurrentUser';

const Auth = ({ children }) => {
  return (
    <CurrentUser>
      {({ loaded, currentUser }) => {
        if (!loaded) {
          return null;
        } else if (loaded && currentUser !== null) {
          return <Redirect to="/jobs" />;
        } else {
          return <Container>{children}</Container>;
        }
      }}
    </CurrentUser>
  );
};

export default Auth;
