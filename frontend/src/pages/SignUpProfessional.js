import React, { Fragment } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { Title, SubTitle } from '../components/auth/StyledComponents';
import {
  FormStyled,
  AuthSubmitStyled,
  LinkStyled,
} from '../components/form/StyledComponents';
import TextInput from '../components/form/TextInput';
import { GET_CURRENT_USER_QUERY } from '../components/auth/CurrentUser';

const SIGN_UP_PROFESSIONAL_MUTATION = gql`
  mutation SignUpProfessional(
    $email: String!
    $password: String!
    $password_confirmation: String!
  ) {
    signUpProfessional(
      user: {
        email: $email
        password: $password
        passwordConfirmation: $password_confirmation
      }
    ) {
      token
      user {
        email
        type
        professional {
          id
          name
          phoneNumber
          description
          experience
          linkedin
          github
        }
        recruiter {
          id
          companyName
          companyLogoPath
          companyWebsite
          companyDescription
        }
      }
    }
  }
`;

const SignUpProfessional = () => {
  let history = useHistory();

  const [signUp, { loading }] = useMutation(SIGN_UP_PROFESSIONAL_MUTATION, {
    onCompleted({ signUpProfessional }) {
      localStorage.setItem('auth-token', signUpProfessional.token);
      history.replace('/');
    },
    update(cache, { data }) {
      cache.writeQuery({
        query: GET_CURRENT_USER_QUERY,
        data: {
          me: data.signUpProfessional.user,
        },
      });
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
          signUp({ variables: values }).catch(({ graphQLErrors }) => {
            setErrors(graphQLErrors[0].details);
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
          <AuthSubmitStyled type="submit" disabled={loading}>
            Submit Up
          </AuthSubmitStyled>
        </FormStyled>
      </Formik>
      <LinkStyled to="/sign-in">Sign in</LinkStyled>
    </Fragment>
  );
};

export default SignUpProfessional;
