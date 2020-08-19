import React, { Fragment } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import {
  Title,
  FormStyled,
  SubmitStyled,
} from '../components/auth/StyledComponents';
import TextInput from '../components/auth/TextInput';

const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
      user {
        type
        email
        id
      }
    }
  }
`;

const SignIn = () => {
  let history = useHistory();

  const [signIn, { loading }] = useMutation(SIGN_IN, {
    onCompleted({ signIn }) {
      localStorage.setItem('auth-token', signIn.token);
      history.push('/');
    },
  });

  return (
    <Fragment>
      <Title>Login</Title>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
        })}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          signIn({ variables: values }).catch(({ graphQLErrors }) => {
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
            placeholder="youremail@email.com"
          />
          <TextInput label="Password" name="password" type="password" />
          <SubmitStyled type="submit" disabled={loading}>
            Login
          </SubmitStyled>
        </FormStyled>
      </Formik>
    </Fragment>
  );
};

export default SignIn;
