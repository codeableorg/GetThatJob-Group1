import React, { Fragment } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Title } from '../components/auth/StyledComponents';
import {
  FormStyled,
  AuthSubmitStyled,
} from '../components/form/StyledComponents';
import TextInput from '../components/form/TextInput';
import { formatErrors } from '../lib/AuthHelper';
import { GET_CURRENT_USER_QUERY } from '../components/auth/CurrentUser';

const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
      user {
        email
        roleData{
          __typename
          ... on Professional{
            id
            name
            phoneNumber
            description
            experience
            linkedin
            github
          }
          ... on Recruiter{
            id
            companyName
            companyLogoPath
            companyWebsite
            companyDescription
          }
        }
      }
    }
  }
`;

const SignIn = () => {
  let history = useHistory();

  const [signIn, { loading }] = useMutation(SIGN_IN, {
    onCompleted({ signIn }) {
      localStorage.setItem('auth-token', signIn.token);
      history.replace('/jobs');
    },
    update(cache, { data }) {
      cache.writeQuery({
        query: GET_CURRENT_USER_QUERY,
        data: {
          me: data.signIn.user,
        },
      });
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
          password: Yup.string().required('Required'),
        })}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          signIn({ variables: values }).catch(({ graphQLErrors }) => {
            console.log(formatErrors(graphQLErrors[0].details));
            setErrors(formatErrors(graphQLErrors[0].details));
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
          <AuthSubmitStyled type="submit" disabled={loading}>
            Login
          </AuthSubmitStyled>
        </FormStyled>
      </Formik>
    </Fragment>
  );
};

export default SignIn;
