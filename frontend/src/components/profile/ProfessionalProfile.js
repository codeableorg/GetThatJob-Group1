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

const ProfessionalProfile = ({ currentUser }) => {
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
      </Formik>
      <Deletetyled>Delete permanently your account</Deletetyled>
    </Fragment>
  );
};

export default ProfessionalProfile;
