import React from 'react';
import styled from '@emotion/styled';

import { getLocalDate, getTimeSince } from '../../utils';

const Wrapper = styled.article`
  display: grid;
  grid-template-columns: auto 1fr auto;
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

  .applications {
    text-align: center;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
  }

  .info {
    display: flex;
    align-items: center;
  }

  .info__date {
    color: #718096;
    font-size: 0.875rem;
    line-height: 1.25rem;
    white-space: nowrap;
  }
`;

export default function JobCardRecruiter({ job, className }) {
  return (
    <Wrapper className={className}>
      <div>
        <div className="title">{job.title}</div>
        <div className="metadata">
          <span className="metadata__location">{job.city.name}</span>
          <img
            className="metadata__flag"
            src={process.env.REACT_APP_HTTP + job.city.country.flagPath}
            alt={job.city.country.name}
          />
        </div>
      </div>

      <div className="applications">{job.applications.length} applicants</div>

      <div className="info">
        <span className="info__date">
          Posted {getTimeSince(getLocalDate(job.insertedAt))}
        </span>
      </div>
    </Wrapper>
  );
}
