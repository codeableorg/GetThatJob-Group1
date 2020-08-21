import React, { useEffect } from 'react';

import CurrentUser from '../components/auth/CurrentUser';

const Profile = () => {
  return (
    <CurrentUser>
      {(currentUser) => {
        if (!currentUser) {
          return null;
        } else if (currentUser.type === 'RECRUITER') {
          return <div>RECRUITER</div>;
        } else {
          return <div>PROFESSIONAL</div>;
        }
      }}
    </CurrentUser>
  );
};

export default Profile;
