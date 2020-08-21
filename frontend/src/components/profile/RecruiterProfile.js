import React, { Fragment } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { FormStyled, GeneralSubmitStyled } from '../form/StyledComponents';
import { Deletetyled } from './StyledComponents';
import TextInput from '../form/TextInput';
import TextAreaInput from '../form/TextAreaInput';
import FileInput from '../form/FileInput';
import { GET_CURRENT_USER_QUERY } from '../auth/CurrentUser';
import { formatErrors } from '../../lib/AuthHelper';

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
        }
        recruiter {
          id
          companyName
        }
      }
    }
  }
`;

const RecruiterProfile = ({ currentUser }) => {
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
      <Formik
        initialValues={{
          company_name: '',
          company_website: '',
          email: '',
          company_description: '',
          company_logo: '',
          company_logo_meta: null,
          password: '',
          password_confirmation: '',
        }}
        validationSchema={Yup.object({
          company_name: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          company_website: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          company_description: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          company_logo_meta: Yup.mixed()
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
                name="company_name"
                type="text"
                placeholder="My GreatCo"
                note="Your company already exists in Get on Board? Don't create a duplicate."
              />
              <TextInput
                label="Company Website"
                name="company_website"
                type="text"
                placeholder="https://"
                note="Your company Website"
              />
              <FileInput
                label="Company Logo"
                name="company_logo"
                type="file"
                note="200x200px minimum"
                formik={formik}
              />
              <TextAreaInput
                label="Description"
                name="company_description"
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
                name="password_confirmation"
                type="password"
              />
              <GeneralSubmitStyled type="submit" disabled={loading}>
                Save Changes
              </GeneralSubmitStyled>
            </FormStyled>
          );
        }}
      </Formik>
      <Deletetyled>Delete permanently your account</Deletetyled>
    </Fragment>
  );
};

export default RecruiterProfile;
