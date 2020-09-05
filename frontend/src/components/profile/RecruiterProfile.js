import React, { Fragment } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { FormStyled, GeneralSubmitStyled } from '../form/StyledComponents';
import DeleteUser from './DeleteUser';
import TextInput from '../form/TextInput';
import TextAreaInput from '../form/TextAreaInput';
import FileInput from '../form/FileInput';
import { formatErrors } from '../../lib/AuthHelper';

const UPDATE_RECRUITER_MUTATION = gql`
  mutation UpdateCurrentRecruiter(
    $companyName: String!
    $companyLogoMeta: Upload
    $companyWebsite: String!
    $companyDescription: String!
  ) {
    updateCurrentRecruiter(
      companyName: $companyName
      companyLogoMeta: $companyLogoMeta
      companyWebsite: $companyWebsite
      companyDescription: $companyDescription
    ) {
      id
      companyName
      companyLogoPath
      companyWebsite
      companyDescription
    }
  }
`;

const RecruiterProfile = ({ currentUser }) => {
  let history = useHistory();

  const [updateRecruiter, { loading }] = useMutation(
    UPDATE_RECRUITER_MUTATION,
    {
      onCompleted() {
        history.replace('/');
      },
    }
  );

  return (
    <Fragment>
      <Formik
        initialValues={{
          ...currentUser.recruiter,
          companyLogo: '',
          companyLogoMeta: null,
        }}
        validationSchema={Yup.object({
          companyName: Yup.string().required('Required'),
          companyWebsite: Yup.string().required('Required'),
          companyDescription: Yup.string().required('Required'),
          companyLogoMeta: Yup.mixed().test(
            'fileFormat',
            'Images only',
            (value) => {
              if (value != null) {
                return [
                  'image/jpg',
                  'image/jpeg',
                  'image/gif',
                  'image/png',
                ].includes(value.type);
              } else {
                return true;
              }
            }
          ),
        })}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          updateRecruiter({ variables: values }).catch(({ graphQLErrors }) => {
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
              <GeneralSubmitStyled type="submit" disabled={loading}>
                Save Changes
              </GeneralSubmitStyled>
            </FormStyled>
          );
        }}
      </Formik>
      <DeleteUser />
    </Fragment>
  );
};

export default RecruiterProfile;
