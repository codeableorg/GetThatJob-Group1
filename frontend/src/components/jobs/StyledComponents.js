import styled from '@emotion/styled/macro';
import { Link } from 'react-router-dom';

export const MyTitle = styled.h1`
  margin-bottom: 15px;
  color: #000000;
  font-size: 2rem;
  font-weight: bold;
  line-height: 2.75rem;
`;

export const MyJobsSection = styled.section`
  display: flex;
  flex-direction: column;

  .job {
    margin-bottom: 15px;
  }
`;

export const LinkStyled = styled(Link)`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  background-color: #3c2dff;

  padding: 8px 26px;
  margin-bottom: 28px;
  width: fit-content;
`;

export const MyFooter = styled.footer`
  text-align: center;
`;
