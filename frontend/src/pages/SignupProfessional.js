import React, { Fragment } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import {
  Title,
  SubTitle,
  FormStyled,
  SubmitStyled,
  LinkStyled,
} from '../components/auth/StyledComponents';
import TextInput from '../components/auth/TextInput';

const SignupProfessional = () => {
  return (
    <Fragment>
      <Title>Sign Up</Title>
      <SubTitle>As Professional</SubTitle>
      <Formik
        initialValues={{
          user: {
            email: '',
            password: '',
            passwordConfirmation: '',
          },
        }}
        validationSchema={Yup.object({
          user: Yup.object({
            email: Yup.string()
              .email('Invalid email address')
              .required('Required'),
            password: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .required('Required'),
            passwordConfirmation: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .required('Required')
              .oneOf([Yup.ref('password')], 'Passwords must match'),
          }),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <FormStyled>
          <TextInput
            label="Email"
            name="user.email"
            type="email"
            placeholder="admin@mail.com"
          />
          <TextInput label="Password" name="user.password" type="password" />
          <TextInput
            label="Password Confirmation"
            name="user.passwordConfirmation"
            type="password"
          />
          <SubmitStyled type="submit">Submit Up</SubmitStyled>
        </FormStyled>
      </Formik>
      <LinkStyled to="/sign-in">Sign in</LinkStyled>
    </Fragment>
  );
};

export default SignupProfessional;
