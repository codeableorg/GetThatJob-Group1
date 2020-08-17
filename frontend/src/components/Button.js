import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.button`
  padding: 10px 20px;
  background: #3c2dff;
  border: 2px solid #3c2dff;
  border-radius: 4px;
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 500;
`;

export default function Button({ children }) {
  return <Wrapper>{children}</Wrapper>;
}
