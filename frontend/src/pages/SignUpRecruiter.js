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
import TextAreaInput from '../components/form/TextAreaInput';
import FileInput from '../components/form/FileInput';
import { formatErrors } from '../lib/AuthHelper';
import { GET_CURRENT_USER_QUERY } from '../components/auth/CurrentUser';

const SIGN_UP_RECRUITER_MUTATION = gql`
  mutation SignUpRecruiter(
    $companyName: String!
    $companyWebsite: String!
    $companyLogoMeta: Upload!
    $companyDescription: String!
    $email: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    signUpRecruiter(
      user: {
        email: $email
        password: $password
        passwordConfirmation: $passwordConfirmation
      }
      companyName: $companyName
      companyLogoMeta: $companyLogoMeta
      companyWebsite: $companyWebsite
      companyDescription: $companyDescription
    ) {
      token
      user {
        email
        type
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

const SignUpRecruiter = () => {
  let history = useHistory();

  const [signUp, { loading }] = useMutation(SIGN_UP_RECRUITER_MUTATION, {
    onCompleted({ signUpRecruiter }) {
      localStorage.setItem('auth-token', signUpRecruiter.token);
      history.replace('/jobs');
    },
    update(cache, { data }) {
      cache.writeQuery({
        query: GET_CURRENT_USER_QUERY,
        data: {
          me: data.signUpRecruiter.user,
        },
      });
    },
  });

  return (
    <Fragment>
      <Title>Sign Up</Title>
      <SubTitle>As Recruiter</SubTitle>
      <Formik
        initialValues={{
          companyName: '',
          companyWebsite: '',
          email: '',
          companyDescription: '',
          companyLogo: '',
          companyLogoMeta: null,
          password: '',
          passwordConfirmation: '',
        }}
        validationSchema={Yup.object({
          companyName: Yup.string().required('Required'),
          companyWebsite: Yup.string().required('Required'),
          companyDescription: Yup.string().required('Required'),
          companyLogoMeta: Yup.mixed()
            .required('A file is required')
            .test('fileFormat', 'Images only', (value) => {
              return (
                value &&
                ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(
                  value.type
                )
              );
            }),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string().required('Required'),
          passwordConfirmation: Yup.string()
            .required('Required')
            .oneOf([Yup.ref('password')], 'Passwords must match'),
        })}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          signUp({ variables: values }).catch(({ graphQLErrors }) => {
            setErrors(formatErrors(graphQLErrors[0].details));
            setSubmitting(false);
          });
        }}
      >
        {(formik) => {
          return (
            <FormStyled>
              <TextInput
                label="Company Name"
                name="companyName"
                type="text"
                placeholder="My GreatCo"
                note="Your company already exists in Get on Board? Don't create a duplicate."
              />
              <TextInput
                label="Company Website"
                name="companyWebsite"
                type="text"
                placeholder="https://"
                note="Your company Website"
              />
              <FileInput
                label="Company Logo"
                name="companyLogo"
                type="file"
                note="200x200px minimum"
                formik={formik}
              />
              <TextAreaInput
                label="Description"
                name="companyDescription"
                note="Your company description"
                rows="4"
              />
              <TextInput
                label="Administrator email"
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
              <AuthSubmitStyled type="submit" disabled={loading}>
                Submit Up
              </AuthSubmitStyled>
            </FormStyled>
          );
        }}
      </Formik>
      <LinkStyled to="/sign-in">Sign in</LinkStyled>
    </Fragment>
  );
};

export default SignUpRecruiter;
