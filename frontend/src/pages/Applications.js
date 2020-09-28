import React from 'react';

import CurrentUser from '../components/auth/CurrentUser';
import ApplicationsProfessional from '../components/applications/ApplicationsProfessional';

const Applications = () => {
  return (
    <CurrentUser>
      {({ loaded, currentUser }) => {
        if (!loaded) {
          return null;
        } else if (currentUser.roleData.__typename === 'Professional') {
          return <ApplicationsProfessional />;
        } else {
          return null;
        }
      }}
    </CurrentUser>
  );
};

export default Applications;
