import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { gql, useLazyQuery, useMutation } from '@apollo/client';

import { GeneralSubmitStyled as Button } from '../components/form/StyledComponents';
import { FormStyled } from '../components/form/StyledComponents';
import FileInput from '../components/form/FileInput';
import TextAreaInput from '../components/form/TextAreaInput';

const Wrapper = styled.div`
  background: #f7fafc;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: #262626;
  font-size: 2rem;
  font-weight: bold;
  line-height: 2.5rem;

  & .blue {
    color: #4e79fb;
  }
`;

const JOB_APPLICATIONS = gql`
  query Application($id: Integer!) {
    applicationCurrentProfessional(id: $id) {
      id
      professionalExperience
      reason
      job {
        id
        title
        recruiter {
          id
          companyName
        }
      }
    }
  }
`;

const EDIT_APPLICATION = gql`
  mutation EditApplicationCurrentProfessional(
    $id: Integer!
    $cvMeta: Upload
    $professionalExperience: String!
    $reason: String!
  ) {
    editApplicationCurrentProfessional(
      id: $id
      cvMeta: $cvMeta
      professionalExperience: $professionalExperience
      reason: $reason
    ) {
      id
      insertedAt
      professionalExperience
      reason
      job {
        id
        title
        introduction
        expected
        lookingFor
        requirements
        jobType {
          id
          name
        }
        recruiter {
          id
          companyName
          companyDescription
        }
        city {
          id
          name
        }
      }
    }
  }
`;

export default function ApplicationsEdit() {
  const { id } = useParams();
  let history = useHistory();

  const [getJobApplications, { error, data, loading, called }] = useLazyQuery(
    JOB_APPLICATIONS,
    {
      variables: { id: Number(id) },
    }
  );

  const [editApplication, { loading: loading_mutation }] = useMutation(
    EDIT_APPLICATION,
    {
      onCompleted() {
        history.replace('/applications');
      },
    }
  );

  useEffect(() => {
    getJobApplications();
    return () => {};
  }, [getJobApplications, id]);

  if (error) return <Redirect to="/applications" />;
  if (!called || loading) return null;

  const { applicationCurrentProfessional: application } = data;

  if (!application) return <Redirect to={`/applications`} />;

  return (
    <Wrapper>
      <Title>
        <span className="blue">Edit your application: </span>
        <span>{application.job.title}</span>
      </Title>

      <Formik
        initialValues={{
          id: Number(id),
          cv: '',
          cvMeta: null,
          professionalExperience: application.professionalExperience,
          reason: application.reason,
        }}
        validationSchema={Yup.object({
          professionalExperience: Yup.string().required(),
          reason: Yup.string().required(),
          cvMeta: Yup.mixed().test('fileFormat', 'PDF only', (value) => {
            if (value != null) {
              return ['application/pdf'].includes(value.type);
            } else {
              return true;
            }
          }),
        })}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          editApplication({ variables: values }).catch(({ graphQLErrors }) => {
            setErrors(graphQLErrors[0].details);
            setSubmitting(false);
          });
        }}
      >
        {(formik) => (
          <FormStyled>
            <FileInput
              id="cv"
              name="cv"
              label="Upload your CV"
              note="PDF files only. 5MB max file size."
              type="file"
              formik={formik}
            />

            <TextAreaInput
              id="professionalExperience"
              name="professionalExperience"
              label="Professional Experience"
              component="textarea"
              placeholder="Worked 6 years in a bitcoin farm until I decided to change my life...."
              rows="5"
            />

            <TextAreaInput
              id="reason"
              name="reason"
              label={`Why are you interested in working at ${application.job.recruiter.companyName}?`}
              placeholder={`Mention things about ${application.job.recruiter.companyName} that excite you. Why would you be a good fit?`}
              rows="5"
            />

            <Button type="submit" disabled={loading_mutation}>
              Update
            </Button>
          </FormStyled>
        )}
      </Formik>
    </Wrapper>
  );
}
