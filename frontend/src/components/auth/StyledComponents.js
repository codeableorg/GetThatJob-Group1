import styled from '@emotion/styled/macro';
import { Form } from 'formik';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 400px;
  margin-top: 132px;
  margin-bottom: 132px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.p`
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 44px;
`;

export const SubTitle = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 25px;
`;
