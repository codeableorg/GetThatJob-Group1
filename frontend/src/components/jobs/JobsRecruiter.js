import React, { useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import { MyTitle, MyJobsSection, LinkStyled } from './StyledComponents';
import JobCardRecruiter from '../../features/jobs/JobCardRecruiter';

const JOBS_RECRUITER = gql`
  query JobsCurrentRecruiter {
    jobsCurrentRecruiter {
      id
      title
      closed
      city {
        id
        name
        country {
          id
          flagPath
          name
        }
      }
      insertedAt
      applications {
        id
      }
    }
  }
`;

const JobsRecruiter = () => {
  const [loadJobs, { error, data, loading, called }] = useLazyQuery(
    JOBS_RECRUITER
  );

  useEffect(() => {
    loadJobs();

    return () => {};
  }, [loadJobs]);

  if (error) return null;
  if (!called || loading) return null;

  let jobComponents = <p>jobs not yet created</p>;

  if (data.jobsCurrentRecruiter.lenght !== 0) {
    jobComponents = data.jobsCurrentRecruiter.map((job) => {
      return (
        <Link to={`/jobs/${job.id}`} key={job.id}>
          <JobCardRecruiter job={job} className="job" />
        </Link>
      );
    });
  }

  return (
    <MyJobsSection>
      <MyTitle>Jobs</MyTitle>
      <LinkStyled to="/jobs/new">New Job</LinkStyled>
      {jobComponents}
    </MyJobsSection>
  );
};

export default JobsRecruiter;
