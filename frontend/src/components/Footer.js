import React from 'react';
import styled from '@emotion/styled';

import { Container } from './StyledComponents';

const Wrapper = styled.footer`
  width: 100%;
  background: #333333;
  padding: 15px 0;

  ${Container} {
    color: #ffffff;
    font-size: 0.85rem;
    font-weight: 300;
    text-align: center;
  }

  a {
    color: #ffffff;
  }
`;

export default function Footer() {
  return (
    <Wrapper>
      <Container>
        <span>Made by </span>
        <a
          href="https://www.linkedin.com/in/albert-castellano/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Albert Castellano
        </a>
        <span> and </span>
        <a
          href="https://www.linkedin.com/in/ricardo-huamani-parian/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Ricardo Huamani
        </a>
      </Container>
    </Wrapper>
  );
}
