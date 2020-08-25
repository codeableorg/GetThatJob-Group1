import React from 'react';
import styled from '@emotion/styled';
import { gql, useQuery } from '@apollo/client';

import Sidebar from '../components/Sidebar';
import { Button } from '../components/StyledComponents';
import JobCard from '../features/jobs/JobCard';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  height: 100%;
  background: #f7fafc;

  .title {
    margin-bottom: 15px;
    color: #000000;
    font-size: 2rem;
    font-weight: bold;
    line-height: 2.75rem;
  }

  .jobs-list {
    margin: 15px;
  }

  .job {
    margin-bottom: 15px;
  }

  .footer {
    text-align: center;
  }
`;

const JOBS = gql`
  query Jobs {
    jobs {
      id
      title
      location
      salary
      type
      seniority
      insertedAt
      recruiter {
        companyName
        companyLogoPath
      }
    }
  }
`;

export default function Jobs() {
  const { data } = useQuery(JOBS);

  return (
    <Wrapper>
      <Sidebar />
      <section className="jobs-list">
        <h1 className="title">Jobs For you</h1>

        {data &&
          data.jobs &&
          data.jobs.map((job) => (
            <JobCard job={job} key={job.id} className="job" />
          ))}

        <footer className="footer">
          <Button>Load More</Button>
        </footer>
      </section>
    </Wrapper>
  );
}
