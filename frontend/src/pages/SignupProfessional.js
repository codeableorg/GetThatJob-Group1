import React, { Fragment } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { gql } from '@apollo/client';
import { Mutation } from '@apollo/client/react/components';

import {
  Title,
  SubTitle,
  FormStyled,
  SubmitStyled,
  LinkStyled,
} from '../components/auth/StyledComponents';
import TextInput from '../components/auth/TextInput';

const SIGNUP_PROFESSIONAL_MUTATION = gql`
  mutation SignupProfessional(
    $email: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    signupProfessional(
      user: {
        email: $email
        password: $password
        passwordConfirmation: $passwordConfirmation
      }
    ) {
      token
      user {
        type
        email
        id
      }
    }
  }
`;

const SignupProfessional = () => {
  return (
    <Fragment>
      <Title>Sign Up</Title>
      <SubTitle>As Professional</SubTitle>
      <Mutation mutation={SIGNUP_PROFESSIONAL_MUTATION}>
        {(signup, { loading }) => {
          return (
            <Formik
              initialValues={{
                email: '',
                password: '',
                passwordConfirmation: '',
              }}
              validationSchema={Yup.object({
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
              })}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  signup({ variables: values });
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              <FormStyled>
                <TextInput
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="admin@mail.com"
                />
                <TextInput label="Password" name="password" type="password" />
                <TextInput
                  label="Password Confirmation"
                  name="passwordConfirmation"
                  type="password"
                />
                <SubmitStyled type="submit" disabled={loading}>
                  Submit Up
                </SubmitStyled>
              </FormStyled>
            </Formik>
          );
        }}
      </Mutation>
      <LinkStyled to="/sign-in">Sign in</LinkStyled>
    </Fragment>
  );
};

export default SignupProfessional;
