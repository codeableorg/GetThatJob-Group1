import React from 'react';

import CurrentUser from '../components/auth/CurrentUser';
import RecruiterProfile from '../components/profile/RecruiterProfile';
import ProfessionalProfile from '../components/profile/ProfessionalProfile';
import {
  ProfileContainer,
  Title,
} from '../components/profile/StyledComponents';

const Profile = () => {
  return (
    <ProfileContainer>
      <Title>Edit your profile</Title>
      <CurrentUser>
        {({ loaded, currentUser }) => {
          if (!loaded) {
            return null;
          } else if (currentUser.type === 'RECRUITER') {
            return <RecruiterProfile currentUser={currentUser} />;
          } else {
            return <ProfessionalProfile currentUser={currentUser} />;
          }
        }}
      </CurrentUser>
    </ProfileContainer>
  );
};

export default Profile;
