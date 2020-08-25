import React, { useState } from 'react';
import styled from '@emotion/styled';

import { FLAGS, COUNTRIES, getLocalDate, getTimeSince } from '../../utils';
import dollarIcon from '../../assets/dollar.png';

const Wrapper = styled.article`
  display: grid;
  grid-template-columns: 60px 1fr auto;
  align-items: center;
  padding: 15px 20px;
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1);

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

  .info {
    display: flex;
    align-items: center;
  }

  .info__salary {
    margin-right: 15px;
    padding: 5px;
    background: #ffffff;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    color: #000000;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .info__image {
    margin-right: 12px;
  }

  .info__label {
    margin-right: 12px;
    padding: 2px 5px;
    background: rgba(60, 45, 255, 0.69);
    color: #ffffff;
    font-size: 0.75rem;
    font-weight: bold;
    line-height: 1rem;
    white-space: nowrap;
  }

  .info__date {
    color: #718096;
    font-size: 0.875rem;
    line-height: 1.25rem;
    white-space: nowrap;
  }
`;

export default function JobItem({ job, className }) {
  const [isSalaryShown, setIsSalaryShown] = useState(false);

  const toogleSalary = () => setIsSalaryShown(!isSalaryShown);

  return (
    <Wrapper className={className}>
      <figure>Able</figure>

      <div>
        <div className="title">{job.title}</div>
        <div className="metadata">
          <span className="metadata__location">
            {job.location} - {COUNTRIES[job.location]}
          </span>
          <img
            className="metadata__flag"
            src={FLAGS[job.location]}
            alt={job.location}
          />
        </div>
      </div>

      <div className="info">
        {isSalaryShown && <div className="info__salary">{job.salary}</div>}
        <img
          className="info__image"
          src={dollarIcon}
          onMouseEnter={toogleSalary}
          onMouseLeave={toogleSalary}
          alt="get-that-job"
        />
        <span className="info__label">{job.seniority}</span>
        <span className="info__label">{job.type}</span>
        <span className="info__date">
          {getTimeSince(getLocalDate(job.insertedAt))}
        </span>
      </div>
    </Wrapper>
  );
}
