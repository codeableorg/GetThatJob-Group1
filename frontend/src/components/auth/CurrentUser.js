import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { gql, useLazyQuery } from '@apollo/client';

const GET_CURRENT_USER_QUERY = gql`
  query GetCurrentUser {
    me {
      email
      type
      professional {
        id
        name
        phoneNumber
        description
        experience
        linkedin
        github
      }
      recruiter {
        id
        companyName
        companyLogoPath
        companyWebsite
        companyDescription
      }
    }
  }
`;

let CurrentUser = ({ children }) => {
  const [getCurrentUser, { error, data, loading, called }] = useLazyQuery(
    GET_CURRENT_USER_QUERY
  );

  useEffect(() => {
    getCurrentUser();
    return () => {};
  }, []);

  if (error) return null;
  if (!called || loading) return children({ currentUser: null, loaded: false });
  return children({ currentUser: data.me, loaded: true });
};

CurrentUser.propTypes = {
  children: PropTypes.func.isRequired,
};

export default CurrentUser;
export { GET_CURRENT_USER_QUERY };
