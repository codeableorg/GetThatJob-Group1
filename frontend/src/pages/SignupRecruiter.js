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
import TextAreaInput from '../components/auth/TextAreaInput';

const SignupRecruiter = () => {
  return (
    <Fragment>
      <Title>Sign Up</Title>
      <SubTitle>As Recruiter</SubTitle>
      <Formik
        initialValues={{
          companyName: '',
          companyWebsite: '',
          email: '',
          description: '',
          password: '',
          passwordConfirmation: '',
        }}
        validationSchema={Yup.object({
          companyName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          companyWebsite: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          description: Yup.string()
            .max(20, 'Must be 20 characters or less')
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
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
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
          <TextAreaInput
            label="Description"
            name="description"
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
            label="Password Confirmaton"
            name="passwordConfirmation"
            type="password"
          />
          <SubmitStyled type="submit">Submit</SubmitStyled>
        </FormStyled>
      </Formik>
      <LinkStyled to="/sign-in">Sign in</LinkStyled>
    </Fragment>
  );
};

export default SignupRecruiter;
