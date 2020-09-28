import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { gql, useLazyQuery } from '@apollo/client';

const GET_CURRENT_USER_QUERY = gql`
  query GetCurrentUser {
    me {
      email
      roleData{__typename
        ... on Professional{
          id
          name
          phoneNumber
          description
          experience
          linkedin
          github
        }
        ... on Recruiter{
          id
          companyName
          companyLogoPath
          companyDescription
          companyWebsite
        }
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
    return () => {
    };
  }, [getCurrentUser]);

  if (error) return children({ currentUser: null, loaded: false });
  if (!called || loading) return children({ currentUser: null, loaded: false });
  return children({ currentUser: data.me, loaded: true });
};

CurrentUser.propTypes = {
  children: PropTypes.func.isRequired
};

export default CurrentUser;
export { GET_CURRENT_USER_QUERY };
