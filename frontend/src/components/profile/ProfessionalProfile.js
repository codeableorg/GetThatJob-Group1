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
  mutation UpdateCurrentProfessional(
    $name: String!
    $phoneNumber: String!
    $description: String!
    $experience: String!
    $linkedin: String
    $github: String
  ) {
    updateCurrentProfessional(
      name: $name
      phoneNumber: $phoneNumber
      description: $description
      experience: $experience
      linkedin: $linkedin
      github: $github
    ) {
      id
      name
      phoneNumber
      description
      experience
      linkedin
      github
    }
  }
`;

const ProfessionalProfile = ({ currentUser }) => {
  let history = useHistory();

  const [updateProfessional, { loading }] = useMutation(
    SIGN_UP_PROFESSIONAL_MUTATION,
    {
      onCompleted() {
        history.replace('/');
      },
      update(cache, { data }) {
        cache.writeQuery({
          query: SIGN_UP_PROFESSIONAL_MUTATION,
          data: data.updateCurrentProfessional,
        });
      },
    }
  );

  return (
    <Fragment>
      <Formik
        initialValues={currentUser.professional}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          phoneNumber: Yup.string().required('Required'),
          description: Yup.string().required('Required'),
          experience: Yup.string().required('Required'),
          linkedin: Yup.string(),
          github: Yup.string(),
        })}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          updateProfessional({ variables: values }).catch(({ e }) => {
            console.log(e);
            // setErrors(formatErrors(graphQLErrors[0].details));
            // setSubmitting(false);
          });
        }}
      >
        <FormStyled>
          <TextInput
            label="Name"
            name="name"
            type="text"
            placeholder="John Doe"
            note="Use your real first and last name"
          />
          <TextInput
            label="Phone Number"
            name="phoneNumber"
            type="text"
            placeholder="987654321"
            note="Add your phone number to make sure you don't miss any job opportunity."
          />
          <TextInput
            label="Professional Description"
            name="description"
            type="text"
            placeholder="e.g Software Engineer, Mememaster, Pokemaster"
            note="Short an specific text about what you do"
          />
          <TextAreaInput
            label="Professional Experience"
            name="experience"
            placeholder="Worked 6 years in a bitcoin farm until I decided to
            change my life...."
            note="Tells us about your work experience, what did you do before joining this top community?"
            rows="4"
          />
          <TextInput
            label="LinkedIn profile URL"
            name="linkedin"
            type="text"
            placeholder="https://linkedin/in/your-name-here"
            note="Your LinkedIn profile helps companies to know more about you."
          />
          <TextInput
            label="GitHub profile URL"
            name="github"
            type="text"
            placeholder="https://github.com/your-user-here"
            note="If you are a developer, a good GitHub profile will tell more about your skills."
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
