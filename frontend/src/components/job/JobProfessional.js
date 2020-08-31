import React, { Fragment, useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';

import {
  ReturnLink,
  SubTitle,
  Title,
  JobTypeAndSeniority,
  JobDetailContainer,
  GeneralTextJob,
  SubSectionTitle,
  JobCard,
  CompanyLogo,
  CompanyName,
  GroupHorizontal,
  GeneralTextCompany,
  LinkWebsiteCompany,
  LinkStyled,
  Separator,
} from './StyledComponents';
import { ReactComponent as LeftArrow } from '../../assets/left_arrow.svg';
import { ReactComponent as LocationLogo } from '../../assets/location.svg';
import { ReactComponent as OpenWebsiteLogo } from '../../assets/open_website.svg';

const GET_JOB_QUERY = gql`
  query GetJob($id: Int!) {
    job(id: $id) {
      id
      title
      jobType {
        id
        name
      }
      seniority {
        id
        name
      }
      salary
      city {
        id
        name
        country {
          id
          name
        }
      }
      introduction
      expected
      lookingFor
      requirements
      recruiter {
        id
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
          <ReturnLink to="/jobs">
            <LeftArrow />
            <p>See more jobs</p>
          </ReturnLink>
          <SubTitle>Posted Feb 24</SubTitle>
          <Title>{job.title}</Title>
          <JobTypeAndSeniority>
            <div>{job.jobType.name}</div>
            <div>{job.seniority.name}</div>
          </JobTypeAndSeniority>
          <GeneralTextJob>{job.introduction}</GeneralTextJob>
          <SubSectionTitle>What will be expected of you:</SubSectionTitle>
          <GeneralTextJob>{job.expected}</GeneralTextJob>
          <SubSectionTitle>What we are looking for:</SubSectionTitle>
          <GeneralTextJob>{job.lookingFor}</GeneralTextJob>
          <SubSectionTitle>Job requirements:</SubSectionTitle>
          <GeneralTextJob>{job.requirements}</GeneralTextJob>
          <SubSectionTitle>About {job.recruiter.companyName}:</SubSectionTitle>
          <GeneralTextJob>{job.recruiter.companyDescription}</GeneralTextJob>
        </div>
        <JobCard>
          <CompanyLogo
            src={process.env.REACT_APP_HTTP + job.recruiter.companyLogoPath}
          />
          <CompanyName>{job.recruiter.companyName}</CompanyName>
          <GroupHorizontal>
            <LocationLogo />
            <GeneralTextCompany>
              {job.city.name}, {job.city.country.name}
            </GeneralTextCompany>
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
          {/* <GeneralTextCompany>Posted 10 jobs</GeneralTextCompany> */}
          <LinkStyled>Get this job</LinkStyled>
          {/* <Separator /> */}
        </JobCard>
      </JobDetailContainer>
    </Fragment>
  );
};

export default JobProfessional;
