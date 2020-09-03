import React from 'react';

import CurrentUser from '../components/auth/CurrentUser';
import JobsProfessional from '../components/jobs/JobsProfessional';
import JobsRecruiter from '../components/jobs/JobsRecruiter';

export default function Jobs() {
  return (
    <CurrentUser>
      {({ loaded, currentUser }) => {
        if (!loaded) {
          return null;
        } else if (currentUser.type === 'RECRUITER') {
          return <JobsRecruiter />;
        } else {
          return <JobsProfessional />;
        }
      }}
    </CurrentUser>
  );
}
