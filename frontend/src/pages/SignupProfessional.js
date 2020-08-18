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
    $password_confirmation: String!
  ) {
    signupProfessional(
      user: {
        email: $email
        password: $password
        passwordConfirmation: $password_confirmation
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
                password_confirmation: '',
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
              onSubmit={(values, { setErrors }) => {
                signup({ variables: values }).catch((e) => {
                  const errors = e.graphQLErrors[0];
                  setErrors(errors.details.user);
                });
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
                  name="password_confirmation"
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
