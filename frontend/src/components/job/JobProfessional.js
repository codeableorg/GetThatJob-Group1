import React, { Fragment, useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';

import {
  Title,
  JobDetailContainer,
  JobCard,
  CompanyLogo,
  CompanyName,
  GroupHorizontal,
  GeneralTextCompany,
  LinkWebsiteCompany,
  LinkStyled,
  Separator,
} from './StyledComponents';
import { ReactComponent as LocationLogo } from '../../assets/location.svg';
import { ReactComponent as OpenWebsiteLogo } from '../../assets/open_website.svg';

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
          <CompanyLogo
            src={
              process.env.REACT_APP_HTTP +
              '/uploads/' +
              job.recruiter.companyLogoPath
            }
          />
          <CompanyName>{job.recruiter.companyName}</CompanyName>
          <GroupHorizontal>
            <LocationLogo />
            <GeneralTextCompany>{job.location}</GeneralTextCompany>
          </GroupHorizontal>
          <GroupHorizontal>
            <OpenWebsiteLogo />
            <LinkWebsiteCompany
              href={job.recruiter.companyWebsite}
              target="_blank"
            >
              Open Website
            </LinkWebsiteCompany>
          </GroupHorizontal>
          <GeneralTextCompany>Posted 10 jobs</GeneralTextCompany>
          <LinkStyled>Get this job</LinkStyled>
          <Separator />
        </JobCard>
      </JobDetailContainer>
    </Fragment>
  );
};

export default JobProfessional;
