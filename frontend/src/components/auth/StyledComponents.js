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

export const FormStyled = styled(Form)`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 2px;
  margin-top: 12px;

  &:first-of-type {
    margin-top: 0px;
  }
`;

export const TextInputStyled = styled.input`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  padding: 8px 12px;
  margin-bottom: 2px;
`;

export const TextAreaInputStyled = styled.textarea`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  padding: 8px 12px;
  margin-bottom: 2px;
  resize: none;
`;

export const NoteInput = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #8c8c8c;
`;

export const ErrorInput = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: red;
`;

export const SubmitStyled = styled.button`
  padding: 8px 99px;
  margin-top: 25px;
  width: fit-content;
  align-self: center;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;

  color: #ffffff;
  background-color: #3c2dff;
  border-radius: 4px;
  border: none;
  cursor: pointer;
`;

export const LinkStyled = styled(Link)`
  text-decoration: none;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  margin-top: 25px;

  color: #3c2dff;
`;
