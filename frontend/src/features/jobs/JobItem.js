import React from 'react';
import styled from '@emotion/styled';

import { FLAGS, COUNTRIES, getLocalDate, getTimeSince } from '../../utils';

const Wrapper = styled.article`
  display: grid;
  grid-template-columns: 60px 1fr auto;
  align-items: center;
  padding: 15px 20px;
  background: #ffffff;

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
      <div>Able</div>
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
      <div className="date">{getTimeSince(getLocalDate(job.insertedAt))}</div>
    </Wrapper>
  );
}
