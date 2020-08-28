import React, { Fragment, useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';

import {
  Title,
  JobDetailContainer,
  JobCard,
  LogoImage,
} from './StyledComponents';

const GET_JOB_QUERY = gql`
  query GetJob($id: Int!) {
    job(id: $id) {
      id
      title
      type
      seniority
      salary
      location
      introduction
      expected
      lookingFor
      requirements
      recruiter {
        companyName
        companyLogoPath
        companyWebsite
        companyDescription
      }
    }
  }
`;

const JobProfessional = ({ jobId }) => {
  const [getJob, { error, data, loading, called }] = useLazyQuery(
    GET_JOB_QUERY
  );

  console.log(jobId);

  useEffect(() => {
    getJob({ variables: { id: parseInt(jobId) } });
    return () => {};
  }, [getJob, jobId]);

  if (error) return null;
  if (!called || loading) return null;

  const { job } = data;

  return (
    <Fragment>
      <JobDetailContainer>
        <div>
          <Title>{job.title}</Title>
        </div>
        <JobCard>
          <LogoImage src={job.title} />
        </JobCard>
      </JobDetailContainer>
    </Fragment>
  );
};

export default JobProfessional;
