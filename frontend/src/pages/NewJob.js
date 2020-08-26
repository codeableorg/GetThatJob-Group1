import React from 'react';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

import CurrentUser from '../components/auth/CurrentUser';
import {
  FormContainer,
  FormStyled,
  GeneralSubmitStyled,
} from '../components/form/StyledComponents';
import TextInput from '../components/form/TextInput';
import TextAreaInput from '../components/form/TextAreaInput';
import SelectInput from '../components/form/SelectInput';
import { BlueTitle } from '../components/StyledComponents';

const LOCATIONS = ['Lima', 'Bogota', 'Mexico'];

const NewJob = () => {
  return (
    <CurrentUser>
      {({ loaded, currentUser }) => {
        if (!loaded) {
          return null;
        } else if (loaded && currentUser.type !== 'RECRUITER') {
          return <Redirect to="/jobs" />;
        } else {
          return (
            <FormContainer>
              <BlueTitle>Post a new job</BlueTitle>
              <Formik
                initialValues={{
                  title: '',
                  type: '',
                  seniority: '',
                  salary: '',
                  location: '',
                  introduction: '',
                  expected: '',
                  lookingFor: '',
                  requirements: '',
                }}
                validationSchema={Yup.object({
                  title: Yup.string()
                    .max(15, 'Must be 15 characters or less')
                    .required('Required'),
                  type: Yup.string()
                    .max(20, 'Must be 20 characters or less')
                    .required('Required'),
                  seniority: Yup.string()
                    .max(20, 'Must be 20 characters or less')
                    .required('Required'),
                  salary: Yup.number().integer().required('Required'),
                  location: Yup.string()
                    .oneOf(LOCATIONS.map((location) => location.toLowerCase()))
                    .max(20, 'Must be 20 characters or less')
                    .required('Required'),
                  introduction: Yup.string()
                    .max(20, 'Must be 20 characters or less')
                    .required('Required'),
                  expected: Yup.string()
                    .max(20, 'Must be 20 characters or less')
                    .required('Required'),
                  lookingFor: Yup.string()
                    .max(20, 'Must be 20 characters or less')
                    .required('Required'),
                  requirements: Yup.string()
                    .max(20, 'Must be 20 characters or less')
                    .required('Required'),
                })}
                onSubmit={(values, { setErrors, setSubmitting }) => {
                  // updateRecruiter({ variables: values }).catch(
                  //   ({ graphQLErrors }) => {
                  //     setErrors(formatErrors(graphQLErrors[0].details));
                  //     setSubmitting(false);
                  //   }
                  // );
                }}
              >
                <FormStyled>
                  <TextInput label="Title" name="title" type="text" />
                  <TextInput label="Salary" name="salary" type="number" />
                  <SelectInput
                    label="Location"
                    name="location"
                    options={LOCATIONS}
                  />

                  <TextAreaInput
                    label="Job introduction"
                    name="introduction"
                    type="text"
                    note="Between 150 and 1000 characters."
                    rows="6"
                  />
                  <TextAreaInput
                    label="What will be expected from the candidate?"
                    name="expected"
                    type="text"
                    note="Between 150 and 1000 characters."
                    rows="6"
                  />
                  <TextAreaInput
                    label="What you are looking for?"
                    name="lookingFor"
                    type="text"
                    note="Between 150 and 1000 characters."
                    rows="6"
                  />
                  <TextAreaInput
                    label="Job requirements:"
                    name="requirements"
                    type="text"
                    note="Between 150 and 1000 characters."
                    rows="6"
                  />
                  <GeneralSubmitStyled type="submit">
                    Post this job!
                  </GeneralSubmitStyled>
                </FormStyled>
              </Formik>
            </FormContainer>
          );
        }
      }}
    </CurrentUser>
  );
};

export default NewJob;
