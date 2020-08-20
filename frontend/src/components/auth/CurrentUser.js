import PropTypes from 'prop-types';
import { gql, useQuery } from '@apollo/client';

const GET_CURRENT_USER_QUERY = gql`
  query GetCurrentUser {
    me {
      email
      type
      professional {
        id
        name
      }
      recruiter {
        id
        companyName
      }
    }
  }
`;

let CurrentUser = ({ children }) => {
  const { error, data } = useQuery(GET_CURRENT_USER_QUERY);
  if (error) return null;
  if (data === undefined) return children(null);
  return children(data.me);
};

CurrentUser.propTypes = {
  children: PropTypes.func.isRequired,
};

export default CurrentUser;
export { GET_CURRENT_USER_QUERY };
