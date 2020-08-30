import React from 'react';
import styled from '@emotion/styled';

import { getLocalDate, getTimeSince } from '../../utils';

const Wrapper = styled.article`
  display: grid;
  grid-template-columns: 60px 1fr auto;
  align-items: center;
  column-gap: 15px;
  padding: 15px 20px;
  background: #ffffff;

  .logo__company__container {
    display: flex;
    align-items: center;
  }

  .logo__company {
    max-width: 100%;
    max-height: 100%;
  }

  .title {
    margin-bottom: 5px;
    color: #4a5568;
    font-size: 1.25rem;
    font-weight: 300;
    line-height: 1.5rem;
  }

  .metadata {
    display: flex;
    align-items: flex-start;
  }

  .metadata__location {
    margin-right: 10px;
    color: #000000;
    font-size: 1rem;
    font-weight: bold;
    line-height: 1rem;
  }

  .metadata__flag {
    height: 14px;
  }
`;

export default function JobItem({ job, className }) {
  return (
    <Wrapper className={className}>
      <div className="logo__company__container">
        <img
          className="logo__company"
          src={process.env.REACT_APP_HTTP + job.recruiter.companyLogoPath}
          alt={job.recruiter.companyName}
        />
      </div>
      <div>
        <div className="title">{job.title}</div>
        <div className="metadata">
          <span className="metadata__location">
            {job.recruiter.companyName} - {job.city.name}
          </span>
          <img
            className="metadata__flag"
            src={process.env.REACT_APP_HTTP + job.city.country.flagPath}
            alt={job.city.country.name}
          />
        </div>
      </div>
      <div className="date">{getTimeSince(getLocalDate(job.insertedAt))}</div>
    </Wrapper>
  );
}
