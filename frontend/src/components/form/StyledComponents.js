import styled from '@emotion/styled/macro';
import { Form } from 'formik';
import { Link } from 'react-router-dom';

export const FormContainer = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
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

export const AuthSubmitStyled = styled.button`
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

export const GeneralSubmitStyled = styled.button`
  padding: 8px 16px;
  margin-top: 12px;
  width: fit-content;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;

  color: #3c2dff;
  background-color: #ffffff;
  border: 1px solid #3c2dff;
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

export const RadioGroupStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0px, 1fr));
`;

export const RadioStyled = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
  color: #595959;
  background-color: #ffffff;
  border: 1px solid #d9d9d9;
  padding-top: 8px;
  padding-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 2px;

  &:first-of-type {
    border-radius: 4px 0px 0px 4px;
  }

  &:last-child {
    border-radius: 0px 4px 4px 0px;
  }

  &.ant-radio-button-wrapper-checked {
    background-color: #3c2dff;
    color: #ffffff;
    border: 1px solid #3c2dff;
  }

  .ant-radio-button {
    display: none;
  }
`;
