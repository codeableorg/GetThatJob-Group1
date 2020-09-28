import React from 'react';

import CurrentUser from '../components/auth/CurrentUser';
import RecruiterProfile from '../components/profile/RecruiterProfile';
import ProfessionalProfile from '../components/profile/ProfessionalProfile';
import { Title } from '../components/profile/StyledComponents';
import { FormContainer } from '../components/form/StyledComponents';

const Profile = () => {
  return (
    <FormContainer>
      <Title>Edit your profile</Title>
      <CurrentUser>
        {({ loaded, currentUser }) => {
          if (!loaded) {
            return null;
          } else if (currentUser.roleData.__typename === 'Recruiter') {
            return <RecruiterProfile currentUser={currentUser} />;
          } else {
            return <ProfessionalProfile currentUser={currentUser} />;
          }
        }}
      </CurrentUser>
    </FormContainer>
  );
};

export default Profile;
