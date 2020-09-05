import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import { FormStyled } from '../components/form/StyledComponents';
import FileInput from '../components/form/FileInput';
import TextAreaInput from '../components/form/TextAreaInput';
import { GeneralSubmitStyled as Button } from '../components/form/StyledComponents';

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

const JOB = gql`
  query Job($id: Integer!) {
    job(id: $id) {
      id
      title
      recruiter {
        companyName
      }
    }
    applicationsCurrentProfessional {
      id
      job {
        id
      }
    }
  }
`;

const APPLY_JOB = gql`
  mutation ApplyJob(
    $jobId: Integer!
    $cvMeta: Upload!
    $professionalExperience: String!
    $reason: String!
  ) {
    applyJob(
      jobId: $jobId
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

export default function JobsApply() {
  const { id } = useParams();
  let history = useHistory();

  const [getJob, { error, data, loading, called }] = useLazyQuery(JOB, {
    variables: { id: Number(id) },
  });

  const [applyJob, { loading: loading_mutation }] = useMutation(APPLY_JOB, {
    onCompleted() {
      history.replace('/applications');
    },
  });

  useEffect(() => {
    getJob();
    return () => {};
  }, [getJob, id]);

  if (error) return <Redirect to="/jobs" />;
  if (!called || loading) return null;

  const { job, applicationsCurrentProfessional } = data;

  const already_apply = applicationsCurrentProfessional.some((application) => {
    return application.job.id === job.id;
  });

  if (already_apply) return <Redirect to={`/jobs/${id}`} />;

  return (
    <Wrapper>
      <Title>
        <span className="blue">Get this job: </span>
        <span>{job.title}</span>
      </Title>

      <Formik
        initialValues={{
          jobId: Number(id),
          cv: '',
          cvMeta: null,
          professionalExperience: '',
          reason: '',
        }}
        validationSchema={Yup.object({
          professionalExperience: Yup.string().required(),
          reason: Yup.string().required(),
          cvMeta: Yup.mixed()
            .test('fileFormat', 'PDF only', (value) => {
              if (value != null) {
                return ['application/pdf'].includes(value.type);
              } else {
                return true;
              }
            })
            .required('Required'),
        })}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          applyJob({ variables: values }).catch(({ graphQLErrors }) => {
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
              label={`Why are you interested in working at ${job.recruiter.companyName}?`}
              placeholder={`Mention things about ${job.recruiter.companyName} that excite you. Why would you be a good fit?`}
              rows="5"
            />

            <Button type="submit" disabled={loading_mutation}>
              Get this job!
            </Button>
          </FormStyled>
        )}
      </Formik>
    </Wrapper>
  );
}
