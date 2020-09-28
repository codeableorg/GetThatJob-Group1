import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';

import { GET_CURRENT_USER_QUERY } from './auth/CurrentUser';
import { Container } from './StyledComponents';
import Dropdown from './Dropdown';
import logo from '../assets/logo.png';
import CurrentUser from './auth/CurrentUser';

const Wrapper = styled.header`
  width: 100%;
  padding: 15px 0;
  background: #ffffff;
  border-bottom: 1px solid #bfbfbf;

  ${Container} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .brand {
    display: flex;
    align-items: center;
    color: inherit;
    text-decoration: none;
  }

  .brand__title {
    font-family: Montserrat;
    font-size: 1.25rem;
    font-weight: 900;
  }

  .logout {
    border: 0;
    background-color: #ffffff;
    color: #f5222d;
    cursor: pointer;
    font-size: 1rem;
    text-align: left;
  }

  .navbar {
    display: grid;
    grid-template-columns: repeat(2, auto);
    align-items: center;
    column-gap: 15px;
  }

  .navbar__link {
    padding: 5px 20px;
    color: inherit;
    font-size: 1rem;
    font-weight: 700;
    text-decoration: none;
  }
`;

const userTitle = (currentUser) => {
  if (currentUser.roleData.__typename === 'Recruiter') {
    return currentUser.roleData.companyName;
  } else if (currentUser.roleData.name === '') {
    return currentUser.email;
  } else {
    return currentUser.roleData.name;
  }
};

export default function Header() {
  let history = useHistory();
  let client = useApolloClient();

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    client.writeQuery({
      query: GET_CURRENT_USER_QUERY,
      data: {
        me: null,
      },
    });
    history.replace('/');
  };

  return (
    <CurrentUser>
      {({ loaded, currentUser }) => (
        <Wrapper>
          <Container>
            <Link className="brand" to="/">
              <img src={logo} alt="get-that-job" />
              <h1 className="brand__title">Get That Job</h1>
            </Link>

            <nav className="navbar">
              {loaded && currentUser ? (
                <Dropdown title={userTitle(currentUser)} color="#3c2dff">
                  <Link to="/profile">Edit your profile</Link>
                  <button className="logout" onClick={handleLogout}>
                    Logout
                  </button>
                </Dropdown>
              ) : (
                <Fragment>
                  <Link className="navbar__link" to="/sign-in">
                    Sign In
                  </Link>

                  <Dropdown title="Sign Up" color="#3c2dff">
                    <Link to="/sign-up/recruiter">Recruiter</Link>
                    <Link to="/sign-up/professional">Professional</Link>
                  </Dropdown>
                </Fragment>
              )}
            </nav>
          </Container>
        </Wrapper>
      )}
    </CurrentUser>
  );
}
