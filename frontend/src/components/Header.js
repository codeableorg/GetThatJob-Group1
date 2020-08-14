import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { Container } from './StyledComponents';
import Dropdown from './Dropdown';
import logo from '../assets/logo.png';

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

export default function Header() {
  return (
    <Wrapper>
      <Container>
        <Link className="brand" to="/">
          <img src={logo} alt="get-that-job" />
          <h1 className="brand__title">Get That Job</h1>
        </Link>

        <nav className="navbar">
          <Link className="navbar__link" to="/sign-in">
            Sign In
          </Link>

          <Dropdown title="Sign Up" color="#3c2dff">
            <Link to="/sign-up/recruiter">Recruiter</Link>
            <Link to="/sign-up/professional">Professional</Link>
          </Dropdown>
        </nav>
      </Container>
    </Wrapper>
  );
}
