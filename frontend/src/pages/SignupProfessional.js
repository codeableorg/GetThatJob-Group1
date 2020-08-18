import React, { Fragment } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

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
  let history = useHistory();

  const [signup, { loading }] = useMutation(SIGNUP_PROFESSIONAL_MUTATION, {
    onCompleted({ signupProfessional }) {
      localStorage.setItem('auth-token', signupProfessional.token);
      history.push('/');
    },
  });

  return (
    <Fragment>
      <Title>Sign Up</Title>
      <SubTitle>As Professional</SubTitle>
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
          password_confirmation: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required')
            .oneOf([Yup.ref('password')], 'Passwords must match'),
        })}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          signup({ variables: values }).catch(({ graphQLErrors }) => {
            setErrors(graphQLErrors[0].details.user);
            setSubmitting(false);
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
      <LinkStyled to="/sign-in">Sign in</LinkStyled>
    </Fragment>
  );
};

export default SignupProfessional;
